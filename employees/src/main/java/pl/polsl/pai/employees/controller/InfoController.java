package pl.polsl.pai.employees.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InfoController {
    @Autowired
    private DataSourceProperties dataSourceProperties;

    @GetMapping("/info/url")
    String url(){
        return dataSourceProperties.getUrl();
    }

    @GetMapping("/info/username")
    String username(){
        return dataSourceProperties.getUsername();
    }

    @GetMapping("/info/password")
    String password(){
        return dataSourceProperties.getPassword();
    }
}
