package appuser;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.*;

@Entity
@ApplicationScoped
public class AppUser extends PanacheEntityBase {

    public AppUser() {}

    @Id
    private String oAuthSub;

    @Column(unique=true)
    private String username;

    @Column(unique = true)
    private String email;

    private Integer profilePicture;

    @OneToOne(cascade = CascadeType.ALL)
    private Stats stats;

    public String getUsername() {
        return username;
    }

    public AppUser setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public AppUser setEmail(String email) {
        this.email = email;
        return this;
    }

    public Integer getProfilePicture() {
        return profilePicture;
    }

    public AppUser setProfilePicture(Integer profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public String getoAuthSub() {
        return oAuthSub;
    }

    public AppUser setoAuthSub(String oAuthSub) {
        this.oAuthSub = oAuthSub;
        return this;
    }

    public Stats getStats() {
        return stats;
    }

    public AppUser setStats(Stats stats) {
        this.stats = stats;
        return this;
    }
}
