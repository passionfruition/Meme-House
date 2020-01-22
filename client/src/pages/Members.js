import React from "react";
import axios from "axios";

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    componentDidMount() {
        //do an axios call to grab our secret message!
        axios.get("/api/protected")
            .then(result => this.setState({ message: result.data.message }))
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-6-tablet is-offset-3-tablet">
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="box">
                        <p className="title">{this.state.message || 'Welcome to Meme House'},</p>
                        <p className="subtitle">{this.props.user.email}</p>
                        <p className="subtitle">You may now post memes!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Members;