// package com.example.demo.config;
// import com.example.demo.entity.SystemUser;
// import com.example.demo.repository.SystemUserRepository;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
// public class DataSeeder {

//     @Bean
//     CommandLineRunner seedData(SystemUserRepository repository,
//                                PasswordEncoder encoder) {

//         return args -> {

//             if (!repository.existsByUsername("admin")) {

//                 SystemUser admin = new SystemUser();

//                 admin.setUsername("admin");
//                 admin.setPassword(encoder.encode("admin123"));
//                 admin.setRole(SystemUser.Role.ADMIN);

//                 repository.save(admin);
//             }

//         };
//     }

// }
package com.example.demo.config;

import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(SystemUserRepository repository,
                               PasswordEncoder encoder) {

        return args -> {

            if (!repository.existsByUsername("admin")) {

                SystemUser admin = new SystemUser();

                admin.setUsername("admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(SystemUser.Role.ADMIN);

                repository.save(admin);
            }

        };
    }
}