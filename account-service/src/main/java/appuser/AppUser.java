package appuser;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@ApplicationScoped
public class AppUser extends PanacheEntityBase {

    public AppUser() {}

    @Id
    private String oAuthSub;

    private Date createdAt;

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

    public Date getCreatedAt() {
        return createdAt;
    }

    public AppUser setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
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

    public String getOAuthSub() {
        return oAuthSub;
    }

    public AppUser setOAuthSub(String oAuthSub) {
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
