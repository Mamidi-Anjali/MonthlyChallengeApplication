package com.project.ChallengeApp;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="monthName")
    private String month;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DescriptionWithTimestamp> descriptionWithTimestamps;

    public Challenge() {
    }

    public Challenge(Long id, String month, List<DescriptionWithTimestamp> descriptionWithTimestamps) {
        this.id = id;
        this.month = month;
        this.descriptionWithTimestamps = descriptionWithTimestamps;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public List<DescriptionWithTimestamp> getDescriptionWithTimestamps() {
        return descriptionWithTimestamps;
    }

    public void setDescriptionWithTimestamps(List<DescriptionWithTimestamp> descriptionWithTimestamps) {
        this.descriptionWithTimestamps = descriptionWithTimestamps;
    }
}

