package mx.edu.utez.firstapp.controllers.person;

import jakarta.validation.Valid;
import mx.edu.utez.firstapp.config.ApiResponse;
import mx.edu.utez.firstapp.controllers.person.dto.PersonDto;
import mx.edu.utez.firstapp.services.person.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = {"*"})
public class PersonController {
    private final PersonService service;

    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll() {
        return service.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> register(
            @Valid @RequestBody PersonDto dto
    ) {
        return service.save(dto.toEntity());
    }

    @PutMapping("/")
    public ResponseEntity<ApiResponse> update(
            @Valid @RequestBody PersonDto dto
    ) {
        return service.update(dto.toEntity());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) { return service.findById(id);}

    @PatchMapping("/")
    public ResponseEntity<ApiResponse> changeStatus(@Valid @RequestBody PersonDto dto) {
        return service.changeStatus(dto.toEntity());
    }
}
