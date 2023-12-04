package org.acme;


import appuser.AppUser;
import appuser.Stats;
import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.Map;

@Path("/users")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class UserResource {

    @Inject
    JsonWebToken jwt;

    @GET
    public Response getAllUsers() {
        return  Response.ok(AppUser.listAll()).build();
    }

    @POST
    @Path("/oauth-login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response oauthLogin(Map<String, String> credentials) {

        if (jwt == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        String sub = jwt.getClaim("sub");
        String email = credentials.get("email");
        String nickname = credentials.get("nickname");

        AppUser user = AppUser.find("oAuthSub", sub).firstResult();
        if (user != null){
            return Response.status(Response.Status.OK).entity(user).build();
        }
        // Create new user
        else {
            // Exit case for creating a user with a duplicate username or email
            if (AppUser.find("username", nickname).firstResult() != null ||
                    AppUser.find("email", email).firstResult() != null) {
                return Response.status(Response.Status.CONFLICT).build();
            }
            user = new AppUser();
            user.setoAuthSub(sub);
            user.setEmail(email);
            user.setUsername(nickname);
            user.setProfilePicture(0);
            user.setStats(new Stats());
            user.persist();
            return Response.status(Response.Status.CREATED).entity(user).build();
        }
    }
}