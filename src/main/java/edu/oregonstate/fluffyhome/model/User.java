package edu.oregonstate.fluffyhome.model;

public class User extends BaseModelObject {

    private Integer userId;

    private String username;

    private String password;

    private String phone;

    private String address;

    private Integer credits = 10;

    private Integer zip;

    private String latlng;

    private String email;

    private String userType;

    private String avaliableDate = "";

    private WeekDayAva avaliableWeekday = new WeekDayAva();

    private Integer rateNumber = 0;

    private Float averageRate;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Float getAverageRate() {
        return averageRate;
    }

    public void setAverageRate(Float averageRate) {
        this.averageRate = averageRate;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public Integer getZip() {
        return zip;
    }

    public void setZip(Integer zip) {
        this.zip = zip;
    }

    public String getLatlng() {
        return latlng;
    }

    public void setLatlng(String latlng) {
        this.latlng = latlng;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getAvaliableDate() {
        return avaliableDate;
    }

    public void setAvaliableDate(String avaliableDate) {
        this.avaliableDate = avaliableDate;
    }

    public Integer getRateNumber() {
        return rateNumber;
    }

    public void setRateNumber(Integer rateNumber) {
        this.rateNumber = rateNumber;
    }

    public WeekDayAva getAvaliableWeekday() {
        return avaliableWeekday;
    }

    public void setAvaliableWeekday(WeekDayAva avaliableWeekday) {
        this.avaliableWeekday = avaliableWeekday;
    }
}