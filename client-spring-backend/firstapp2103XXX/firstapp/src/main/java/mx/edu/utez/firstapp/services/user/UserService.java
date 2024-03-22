package mx.edu.utez.firstapp.services.user;

import mx.edu.utez.firstapp.config.ApiResponse;
import mx.edu.utez.firstapp.models.person.Person;
import mx.edu.utez.firstapp.models.person.PersonRepository;
import mx.edu.utez.firstapp.models.role.Role;
import mx.edu.utez.firstapp.models.role.RoleRepository;
import mx.edu.utez.firstapp.models.user.User;
import mx.edu.utez.firstapp.models.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserService {
    private final PersonRepository personRepository;
    private final UserRepository repository;
    private final RoleRepository roleRepository;

    public UserService(PersonRepository personRepository, UserRepository repository, RoleRepository roleRepository) {
        this.personRepository = personRepository;
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll() {
        return new ResponseEntity<>(
                new ApiResponse(repository.findAll(), HttpStatus.OK),
                HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public Optional<User> findUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Transactional
    public ResponseEntity<ApiResponse> changeStatus(Long id, User user){
        Optional<User> foundUser = repository.findById(id);
        if (foundUser.isPresent()){
            foundUser.get().setStatus(!foundUser.get().getStatus());
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(foundUser.get()), HttpStatus.OK), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "RecordDontExist"), HttpStatus.BAD_REQUEST);
    }
}
