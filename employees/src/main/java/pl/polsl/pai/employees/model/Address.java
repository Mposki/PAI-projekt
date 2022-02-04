package pl.polsl.pai.employees.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Column(name = "country")
    private String country;
    @NotNull
    @Column(name = "cityname")
    private String cityName;
    @NotNull
    @Column(name = "streetname")
    private String streetName;
    @NotNull
    @Column(name = "streetnumber")
    private String streetNumber;
    @Column(name = "locnumber")
    private String locNumber;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getLocNumber() {
        return locNumber;
    }

    public void setLocNumber(String locNumber) {
        this.locNumber = locNumber;
    }
}
