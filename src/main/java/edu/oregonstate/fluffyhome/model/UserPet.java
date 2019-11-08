package edu.oregonstate.fluffyhome.model;

public class UserPet {
    private Integer petid;

    private Integer userid;

    private String pettype;

    private String petname;

    private String petinfo;

    public Integer getPetid() {
        return petid;
    }

    public void setPetid(Integer petid) {
        this.petid = petid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getPettype() {
        return pettype;
    }

    public void setPettype(String pettype) {
        this.pettype = pettype == null ? null : pettype.trim();
    }

    public String getPetname() {
        return petname;
    }

    public void setPetname(String petname) {
        this.petname = petname == null ? null : petname.trim();
    }

    public String getPetinfo() {
        return petinfo;
    }

    public void setPetinfo(String petinfo) {
        this.petinfo = petinfo == null ? null : petinfo.trim();
    }
}