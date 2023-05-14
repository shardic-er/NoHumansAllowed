package User;

import jakarta.persistence.OneToOne;

public class User {

    private String username;

    private String password;

    @OneToOne
    private Stats stats;

}
