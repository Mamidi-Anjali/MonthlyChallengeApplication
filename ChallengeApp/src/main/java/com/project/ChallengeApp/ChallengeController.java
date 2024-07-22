package com.project.ChallengeApp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenges")
@CrossOrigin(origins = "http://localhost:3000/")
public class ChallengeController {
    private ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @GetMapping
    public ResponseEntity<List<Challenge>> getAllChallenges(){
        return new ResponseEntity<>(challengeService.getAllChallenges(), HttpStatus.OK);
    }

    @GetMapping("/{month}")
    public ResponseEntity<Challenge> getChallengeByMonth(@PathVariable String month){
        Challenge challenges = challengeService.getChallengeByMonth(month);
        if(challenges!=null)
            return new ResponseEntity<>(challenges,HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<String> addNewChallenge(@RequestBody Challenge challenge){
        boolean isAdded = challengeService.addNewChallenge(challenge);
        if(isAdded)
            return new ResponseEntity<>("ADDED NEW CHALLENGE SUCCESSFULLY",HttpStatus.CREATED);
        return new ResponseEntity<>("Adding a new challenge was UnSuccessful",HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateChallenge(@PathVariable Long id, @RequestBody Challenge updatedChallenge){
        System.out.println("Received update request for Challenge ID: " + id); // Log received ID
        System.out.println("Updated Challenge Data: " + updatedChallenge); // Log received challenge data
        boolean isUpdated = challengeService.updateChallenge(id,updatedChallenge);
        if(isUpdated)
            return new ResponseEntity<>("Challenge updated successfully" , HttpStatus.OK);
        return new ResponseEntity<>("Challenge Updation UnSuccessful / NOT FOUND",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}/{taskId}")
    public ResponseEntity<String> deleteChallenge(@PathVariable Long id, @PathVariable Long taskId){
        boolean isDeleted = challengeService.deleteTaskFromChallenge(id,taskId);
        if(isDeleted)
            return new ResponseEntity<>("Challenge deleted successfully" , HttpStatus.OK);
        return new ResponseEntity<>("Challenge Deletion UnSuccessful / NOT FOUND",HttpStatus.NOT_FOUND);
    }
}
