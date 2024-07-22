package com.project.ChallengeApp;

import java.util.List;

public interface ChallengeService {
    public List<Challenge> getAllChallenges();
    public Challenge getChallengeByMonth(String month);
    public boolean addNewChallenge(Challenge challenge);
    public boolean updateChallenge(Long id, Challenge updatedChallenge);
    public boolean deleteTaskFromChallenge(Long id, Long taskId);
}
