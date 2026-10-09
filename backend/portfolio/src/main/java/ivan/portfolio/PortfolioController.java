package ivan.portfolio;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

    @GetMapping("/profile")
    public Profile getProfile() {
        return new Profile(
                "Ivan Seit",
                "",
                "I build reliable applications and automate infrastructure.",
                "you@example.com",
                List.of("Java", "Spring Boot", "React", "AWS", "Ansible")
        );
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return List.of(
                new Project(
                        "This Website",
                        "A personal portfolio website built with React and Spring Boot.",
                        "https://github.com/your-user/project-one",
                        List.of("Java", "Spring Boot", "React")
                ),
                new Project(
                        "Discord Bot",
                        "A Discord bot built with Nodejs.",
                        "https://github.com/your-user/project-two",
                        List.of("Nodejs", "Discord.js")
                ),
                new Project(
                        "Anchor",
                        "A single, comprehensive SuiteApp for all food and beverage management needs.",
                        "https://github.com/your-user/project-three",
                        List.of("Nodejs", "JavaScript", "SuiteScript", "NetSuite","Angular","Azure")
                )
        );
    }

    public record Profile(
            String name,
            String role,
            String bio,
            String email,
            List<String> skills
    ) {
    }

    public record Project(
            String title,
            String description,
            String url,
            List<String> technologies
    ) {
    }
}