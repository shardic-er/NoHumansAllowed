package appuser;

public enum ProfilePicEnum {

    ACCUSER("src/assets/accuser.png"),
    BAZZMOZ("src/assets/bazzmoz.png"),
    CURIOSITY("src/assets/curiosity.png"),
    DETECTIVE("src/assets/detective.png"),
    EUREKA("src/assets/eureka.png"),
    MINUSONE("src/assets/minusone.png"),
    ROBOHNO("src/assets/robohno.png"),
    SADGEARS("src/assets/sadgears.png"),
    SARGENTBOLTS("src/assets/sargentbolts.png"),
    SCARYTRON("src/assets/scarytron.png"),
    SONNY("src/assets/sonny.png"),
    WATTEE("src/assets/wattee.png");

    private final String filePath;

    ProfilePicEnum(String filePath) {
        this.filePath = filePath;
    }

    public String getFilePath() {
        return filePath;
    }

}
