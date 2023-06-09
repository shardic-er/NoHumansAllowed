package org.acme;


import appuser.AppUser;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.PreMatching;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users")
@PreMatching
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @GET
    public Response getAllUsers() {
        return  Response.ok(AppUser.listAll()).build();
    }

    @GET
    @Path("/{id}")
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
    public Response login(JsonObject credentials){
        String username = credentials.getString("username");
        String password = credentials.getString("password");
        try{
            AppUser user = AppUser.find("username", username).firstResult();
            if(user != null) {
                if (password.equals(user.getPassword())) {
                    return Response.status(Response.Status.ACCEPTED).entity(user).build();
                }
            }
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        // Add error handling for wrong credentials requests
        catch (Exception ex){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

    }

}