import React from 'react';

import config from '../../config';

import '../Add.css';

export default class AddFolder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newFolder: "",
        }
        this.textInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    /* posts the folder to the endpoint if there's a valid name*/
    handleSubmit(e){
        e.preventDefault();
        console.log(e);

        const userFolder = this.state.newFolder;

        fetch(config.FOLDER_ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name:userFolder}),
       })
        .then(() => this.handleAddFolder())
        .catch(error => console.log(error));
    }

    /*make sure user has entered value for folder before submitting */
    validateForm(){
        const folder = this.state.newFolder.trim();
        if(folder.length === 0){
            return 'Please enter a name for your folder.';
        }
    }

    /*save folder name */
    updateFolder(e){
        this.setState({
            newFolder: e.target.value,
        })
    }

    handleAddClick(){
        this.props.addClickHandler();
    }

    handleAddFolder(){
        this.handleAddClick();
        this.props.addFolderHandler();
    }

    componentDidMount(){
        this.textInput.current.focus(); 
     }

    render(){
        const hasFolderError = this.validateForm() ? true : false;

        return(
            <div className="popup__form" onSubmit={e => this.handleSubmit(e)}>
                <form className="add__item" id="addFolder">
                    <label htmlFor="folderName">Folder Name*: 
                        <input 
                          type="text" 
                          name="folderName" 
                          id="folderName" 
                          aria-required="true"
                          onChange={e => this.updateFolder(e)}
                          ref={this.textInput}
                        />
                    </label>

                    <div className="buttons">
                        <button type="submit" disabled={hasFolderError}>Add Folder</button>
                        <button onClick={this.handleAddClick}>Cancel</button>
                    </div>

                    <p>* required field</p>
                    
                </form>
            </div>
        )
    }
}