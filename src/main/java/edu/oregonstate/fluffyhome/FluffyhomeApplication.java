package edu.oregonstate.fluffyhome;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author: Chendi Zhang
 * @date: 10/15/19
 * @description:
 **/

@SpringBootApplication
@MapperScan("edu.oregonstate.fluffyhome.mapper")
public class FluffyhomeApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(FluffyhomeApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(FluffyhomeApplication.class);
    }

}
