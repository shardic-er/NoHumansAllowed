package org.acme;

public class UserService {

    public static boolean validateUsername(String username) {
        int minLength = 6;
        int maxLength = 16;

        // Regular expression to validate the username:
        // ^ asserts position at start of a line
        // [A-Za-z0-9] any letter or digit
        // {minLength,maxLength} is a quantifier specifying the length between min and max
        // $ asserts position at the end of a line
        String regex = "^[A-Za-z0-9]{" + minLength + "," + maxLength + "}$";

        // Returns true if the username matches the regex, false otherwise
        return username.matches(regex);
    }
}