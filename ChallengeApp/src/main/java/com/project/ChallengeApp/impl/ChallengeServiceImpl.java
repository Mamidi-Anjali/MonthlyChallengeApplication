package com.project.ChallengeApp.impl;

import com.project.ChallengeApp.Challenge;
import com.project.ChallengeApp.ChallengeRepository;
import com.project.ChallengeApp.ChallengeService;
import com.project.ChallengeApp.DescriptionWithTimestamp;
import org.springframework.stereotype.Service;

import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    private ChallengeRepository challengeRepository;

    public ChallengeServiceImpl(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    @Override
    public List<Challenge> getAllChallenges() {
        List<Challenge> challenges =  challengeRepository.findAll();
        challenges.sort(Comparator.comparingInt(challenge ->
                getMonthIndex(challenge.getMonth())));
        return challenges;
    }

    private int getMonthIndex(String month) {
        String[] months = new DateFormatSymbols().getMonths();
        for (int i = 0; i < months.length; i++) {
            if (months[i].equalsIgnoreCase(month)) {
                return i;
            }
        }
        return -1; // Handle if month is not found
    }
    @Override
    public Challenge getChallengeByMonth(String month) {
        return challengeRepository.findAllByMonthIgnoreCase(month).orElse(null);
    }

    @Override
    public boolean addNewChallenge(Challenge challenge) {
        Challenge existingChallenge = getChallengeByMonth(challenge.getMonth());
        if (existingChallenge == null) {
            for (DescriptionWithTimestamp desc : challenge.getDescriptionWithTimestamps()) {
                desc.setTimestamp(LocalDate.now());
            }
            challengeRepository.save(challenge);
        } else {
            for (DescriptionWithTimestamp desc : challenge.getDescriptionWithTimestamps()) {
                desc.setTimestamp(LocalDate.now());
                existingChallenge.getDescriptionWithTimestamps().add(desc);
            }
            challengeRepository.save(existingChallenge);
        }
        return true;
    }

//@Override
//public boolean updateChallenge(Long id, Challenge updatedChallenge) {
//    Optional<Challenge> challengeOptional = challengeRepository.findById(id);
//    if (challengeOptional.isPresent()) {
//        Challenge oldChallenge = challengeOptional.get();
//        oldChallenge.setMonth(updatedChallenge.getMonth());
//
//        List<DescriptionWithTimestamp> existingDescriptions = oldChallenge.getDescriptionWithTimestamps();
//        List<DescriptionWithTimestamp> updatedDescriptions = updatedChallenge.getDescriptionWithTimestamps();
//
//        for (DescriptionWithTimestamp updatedDesc : updatedDescriptions) {
//            for (DescriptionWithTimestamp existingDesc : existingDescriptions) {
//                if (Objects.equals(updatedDesc.getTaskId(), existingDesc.getTaskId())) {
//                    existingDesc.setDescription(updatedDesc.getDescription());
//                    existingDesc.setProgress(updatedDesc.getProgress());
//                    existingDesc.setDuedate(updatedDesc.getDuedate());
////                    existingDesc.setTimestamp(LocalDateTime.now());
//                    break; // Exit inner loop once updated
//                }
//            }
//        }
//
//        challengeRepository.save(oldChallenge);
//        return true;
//    }
//    return false;
//}


    @Override
    public boolean updateChallenge(Long id, Challenge updatedChallenge) {
        Optional<Challenge> challengeOptional = challengeRepository.findById(id);
        if (challengeOptional.isPresent()) {
            Challenge oldChallenge = challengeOptional.get();
            oldChallenge.setMonth(updatedChallenge.getMonth());

            // Create a map of existing descriptions by taskId for quick lookup
            Map<Long, DescriptionWithTimestamp> existingDescMap = oldChallenge.getDescriptionWithTimestamps().stream()
                    .collect(Collectors.toMap(DescriptionWithTimestamp::getTaskId, Function.identity()));

            // Iterate over the updated descriptions
            for (DescriptionWithTimestamp updatedDesc : updatedChallenge.getDescriptionWithTimestamps()) {
                if (existingDescMap.containsKey(updatedDesc.getTaskId())) {
                    DescriptionWithTimestamp existingDesc = existingDescMap.get(updatedDesc.getTaskId());
                    existingDesc.setDescription(updatedDesc.getDescription());
                    existingDesc.setProgress(updatedDesc.getProgress());
                    existingDesc.setDuedate(updatedDesc.getDuedate());
                    System.out.println("Updated Desc: " + existingDesc); // Log updated description

                }
            }

            challengeRepository.save(oldChallenge);
            System.out.println("Updated Challenge: " + oldChallenge); // Log updated challenge
            return true;
        }
        return false;
    }


    @Override
    public boolean deleteTaskFromChallenge(Long challengeId, Long taskId) {
        Optional<Challenge> challengeOptional = challengeRepository.findById(challengeId);
        if (challengeOptional.isPresent()) {
            Challenge challenge = challengeOptional.get();
            List<DescriptionWithTimestamp> descriptions = challenge.getDescriptionWithTimestamps();

            boolean removed = descriptions.removeIf(desc -> Objects.equals(desc.getTaskId(), taskId));

            if (removed) {
                challengeRepository.save(challenge);
                return true;
            }
        }
        return false;
    }
}
