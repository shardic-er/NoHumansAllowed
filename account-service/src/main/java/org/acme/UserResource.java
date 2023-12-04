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

import java.util.UUID;

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
    @Transactional
    public Response oauthLogin() {

        if (jwt == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        String sub = jwt.getClaim("sub");
        AppUser user = AppUser.find("oAuthSub", sub).firstResult();
        if (user != null){
            return Response.status(Response.Status.OK).entity(user).build();
        }
        // Create new user
        else {
            user = new AppUser();
            user.setoAuthSub(sub);
            user.setUsername(String.valueOf(UUID.randomUUID()));
            user.setProfilePicture(0);
            user.setStats(new Stats());
            user.persist();
            return Response.status(Response.Status.CREATED).entity(user).build();
        }
    }
}