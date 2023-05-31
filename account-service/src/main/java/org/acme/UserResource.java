package org.acme;


import appuser.AppUser;
import appuser.Credentials;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.smallrye.jwt.build.Jwt;
import io.smallrye.jwt.build.JwtException;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.PreMatching;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jwt.KeyUtils;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.PrivateKey;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;

@Path("/users")
@PreMatching
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@SecurityScheme(securitySchemeName = "jwt",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT")
public class UserResource {

//    @Inject
//    JsonWebToken jwt;

    @GET
    public Response getAllUsers() {
        return  Response.ok(AppUser.listAll()).build();
    }

    @GET
    @Path("/{id}")
    @SecurityRequirement(name="jwt")
    @RolesAllowed({"Users", "Admin"})
    public Response getUser(@PathParam("id") Long id){
        AppUser user = AppUser.findById(id);
        if (user == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(user).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateUser(@PathParam("id") Long id, AppUser user){
        AppUser entity = AppUser.findById(id);
        if(entity == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        entity.setUsername(user.getUsername());
        entity.setStats(user.getStats());
        entity.persist();

        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id, AppUser user){
        AppUser entity = AppUser.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        entity.delete();
        return Response.noContent().build();
    }

    @POST
    @Transactional
    @Path("/create")
    public Response createAppUser(AppUser user){
        try{
            user.persist();
            return Response.status(Response.Status.CREATED).entity(user).build();
        }
        // Add error handling for bad requests
        catch (Exception ex){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Path("/login")
    public Response login(Credentials credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
        try {
            // Verify user credentials against the stored data in the database
            AppUser user = AppUser.find("username", username).firstResult();
            if (user != null && password.equals(user.getPassword())) {

                // Generate a JWT token for the authenticated user
                String token = Jwt.issuer("localhost:8080, 127.0.0.1:8080")
                        .subject(user.getUsername())
                        .groups(new HashSet<>(Arrays.asList("User", "Admin")))
                        .claim("userId", user.getUser_id())
                        .sign();

                // Return the JWT token as a response
                return Response.ok(token, MediaType.TEXT_PLAIN).build();
            } else {
                // Invalid credentials
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } catch (Exception ex) {
            // Error occurred during authentication
            ex.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @POST
//    @Path("/verify")
//    public Response verify(@HeaderParam("Authorization") String authorizationHeader){
//
//        // Validation
//        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
//            return Response.status(Response.Status.UNAUTHORIZED).entity("Missing or invalid Authorization header").build();
//        }
//        String jwtToken = authorizationHeader.substring("Bearer ".length());
//
//        System.out.println(jwtToken);
//
//        try {
//            // Path to the private key file
//            String secretKeyPath = "src/main/java/jwt/publicKey.pem";
//
//            // Get the private key
//            PrivateKey privateKey = KeyUtils.getPrivateKey(secretKeyPath);
//
//            System.out.println("asdf");
//
//            Jws<Claims> claimsJws = Jwts.parserBuilder()
//                    .setSigningKey(privateKey)
//                    .build()
//                    .parseClaimsJws(jwtToken);
//
//            // Extract user_id
//            String userId = claimsJws.getBody().get("user_id", String.class);
//
//            System.out.println(userId);
//
//            // Find user in database
//            AppUser user = AppUser.find("user_id", userId).firstResult();
//
//            // Catch if user is not found
//            if (user == null) {
//                return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
//            }
//
//            //Return user
//            return Response.ok(user).build();
//
//        } catch (Exception e) {
//            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token").build();
//        }
//    }

}