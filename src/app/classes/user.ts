export class UserDetails{
    _id:string='';
    firstname:string='';
    lastname:string='';
    email:string='';
    university:string='NA';
    website:string='NA';
    title:string='NA';
    phone:string='NA';
    bio:string='NA';

    toFormData():FormData{ 
        var data=new FormData();
        data.append('firstname',this.firstname);
        data.append('lastname',this.lastname)
        data.append('email',this.email);
        data.append('university',this.university);
        data.append('website',this.website);
        data.append('title',this.title);
        data.append('phone',this.phone); 
        data.append('bio',this.bio); 
        return data;
    }
    fromJson(user:any):UserDetails{
        this._id=user._id;
        this.firstname=user.firstname;
        this.lastname=user.lastname;
        this.email=user.email;
        this.university=user.university;
        this.phone=user.phone;
        this.website=user.website;
        this.bio=user.bio;
        this.title=user.title;
        return this;
    }
}