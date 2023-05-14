package User;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@ApplicationScoped
public class Stats extends PanacheEntityBase {

    public Stats() {}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long gamesPlayed;

    private long gamesWon;

    private long roundsSurvived;

    private long gamesAbandoned;

    public long getId() {
        return id;
    }

    public long getGamesPlayed() {
        return gamesPlayed;
    }

    public Stats setGamesPlayed(long gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
        return this;
    }

    public long getGamesWon() {
        return gamesWon;
    }

    public Stats setGamesWon(long gamesWon) {
        this.gamesWon = gamesWon;
        return this;
    }

    public long getRoundsSurvived() {
        return roundsSurvived;
    }

    public Stats setRoundsSurvived(long roundsSurvived) {
        this.roundsSurvived = roundsSurvived;
        return this;
    }

    public long getGamesAbandoned() {
        return gamesAbandoned;
    }

    public Stats setGamesAbandoned(long gamesAbandoned) {
        this.gamesAbandoned = gamesAbandoned;
        return this;
    }
}
