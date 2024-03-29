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

import java.util.Date;
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

    @GET
    @Path("/check-username")
    @Authenticated
    public Response checkUsernameAvailability(@QueryParam("username") String username) {
        if (jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        boolean isAvailable = AppUser.find("username", username).firstResultOptional().isEmpty();
        boolean isValid = UserService.validateUsername(username);

        if (isAvailable && isValid) {
            return Response.ok().entity("Available").build();
        } else if (isAvailable) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity("NOT_ACCEPTABLE").build();
        } else {
            return Response.status(Response.Status.CONFLICT).entity("Taken").build();
        }
    }


    @POST
    @Path("/oauth-login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    @Authenticated
    public Response oauthLogin(Map<String, String> credentials) {

        if (jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        String sub = jwt.getClaim("sub");
        String email = credentials.get("email");
        String nickname = credentials.get("nickname");

        AppUser user = AppUser.find("oAuthSub", sub).firstResult();
        // Found user, login to existing user
        if (user != null){
            user.getStats().setLastLogin();
            user.persist();
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
            user.setOAuthSub(sub);
            user.setEmail(email);
            user.setUsername(nickname);
            user.setCreatedAt(new Date());
            user.setProfilePicture("/src/assets/accuser.png");
            user.setStats(new Stats().setLastLogin());
            user.persist();
            return Response.status(Response.Status.CREATED).entity(user).build();
        }
    }

    @PUT
    @Path("/update")
    @Transactional
    @Authenticated
    public Response updateUserDetails(Map<String, Object> updates) {
        if (jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        String sub = jwt.getClaim("sub");
        AppUser user = AppUser.find("oAuthSub", sub).firstResult();

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found.").build();
        }

        // Handle username update
        if (updates.containsKey("username")) {
            String newUsername = (String) updates.get("username");
            // Check for username conflict
            if (AppUser.find("username", newUsername).firstResult() != null) {
                return Response.status(Response.Status.CONFLICT).entity("Username already exists.").build();
            }
            user.setUsername(newUsername);
        }

        // Handle profile picture update
        if (updates.containsKey("profilePicture")) {
            String newProfilePicture = (String) updates.get("profilePicture");
            user.setProfilePicture(newProfilePicture);
        }

        // Handle stats update
        if (updates.containsKey("stats")) {
            Stats userStats = user.getStats();
            Map<String, Integer> newStats = (Map<String, Integer>) updates.get("stats");

            // Increment gamesWon
            if (newStats.containsKey("gamesWon")) {
                userStats.incrementGamesWon();
            }

            // Increment gamesPlayed
            if (newStats.containsKey("gamesPlayed")) {
                userStats.incrementGamesPlayed();
            }

            // Increment roundsSurvived
            if (newStats.containsKey("roundsSurvived")) {
                userStats.incrementRoundsSurvived();
            }

            // Increment gamesAbandoned
            if (newStats.containsKey("gamesAbandoned")) {
                userStats.incrementGamesAbandoned();
            }
        }

        user.persistAndFlush();

        return Response.status(Response.Status.OK).entity(user).build();
    }
}