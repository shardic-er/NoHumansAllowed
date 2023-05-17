package User;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.*;

@Entity
@ApplicationScoped
public class AppUser extends PanacheEntityBase {

    public AppUser() {}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long user_id;

    private String username;

    private String password;

    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    private Stats stats;

    public String getEmail() {
        return email;
    }

    public AppUser setEmail(String email) {
        this.email = email;
        return this;
    }

    public long getUser_id() {
        return user_id;
    }

    public String getUsername() {
        return username;
    }

    public AppUser setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public AppUser setPassword(String password) {
        this.password = password;
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
