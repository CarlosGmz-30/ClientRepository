package mx.edu.utez.firstapp.controllers.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.firstapp.models.user.User;

@NoArgsConstructor
@Setter
@Getter
public class StatusDto {
    private Long id;
    private String username;
    private String password;
    private Boolean status;

    public User toEntity() {
        return new User(id, username, password, status);
    }

}
