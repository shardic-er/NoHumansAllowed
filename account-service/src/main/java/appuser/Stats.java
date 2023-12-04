package appuser;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.Date;

@Entity
@ApplicationScoped
public class Stats extends PanacheEntityBase {

    public Stats() {}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stats_id;

    private Date lastLogin;

    private long gamesPlayed;

    private long gamesWon;

    private long roundsSurvived;

    private long gamesAbandoned;

    @Transactional
    public Stats incrementGamesPlayed() {
        Stats match = Stats.find("stats_id", this.stats_id).firstResult();
        if (match != null) {
            match.gamesPlayed += 1;
            return match;
        } else {
            throw new NotFoundException("Stats not found for id: " + this.stats_id);
        }
    }

    @Transactional
    public Stats incrementGamesWon() {
        Stats match = Stats.find("stats_id", this.stats_id).firstResult();
        if (match != null) {
            match.gamesWon += 1;
            return match;
        } else {
            throw new NotFoundException("Stats not found for id: " + this.stats_id);
        }
    }

    @Transactional
    public Stats incrementRoundsSurvived() {
        Stats match = Stats.find("stats_id", this.stats_id).firstResult();
        if (match != null) {
            match.roundsSurvived += 1;
            return match;
        } else {
            throw new NotFoundException("Stats not found for id: " + this.stats_id);
        }
    }

    @Transactional
    public Stats incrementGamesAbandoned() {
        Stats match = Stats.find("stats_id", this.stats_id).firstResult();
        if (match != null) {
            match.gamesAbandoned += 1;
            return match;
        } else {
            throw new NotFoundException("Stats not found for id: " + this.stats_id);
        }
    }

    public long getStats_id() {
        return stats_id;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public Stats setLastLogin() {
        this.lastLogin = new Date();
        return this;
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
