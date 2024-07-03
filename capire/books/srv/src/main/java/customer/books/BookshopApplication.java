package customer.books;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"customer.books.handler", "books.srv"})
public class BookshopApplication  {

	public static void main(String[] args) {
		SpringApplication.run(BookshopApplication.class, args);
	}

}
