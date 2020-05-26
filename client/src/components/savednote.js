/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNote, deleteNote, updateNote } from '../actions/noteApi';

class SavedNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      notes: '',
    };
  }

  //   componentDidMount() {
  //     this.props.fetchNote(this.props.match.params.postID);
  //   }

  handleEditClick = () => {
    const {
      title, content, coverUrl, tags,
    } = this.props.post;
    this.setState({
      title,
      content,
      coverUrl,
      tags,
      isEditing: true,
    });
  }

  handleDoneClick = () => {
    this.setState({
      isEditing: false,
    });
    this.props.updateNote(this.state);
  }

    onInputNotesChange = (event) => {
      console.log(event.target.value);
      this.setState({ notes: event.target.value });
    }

    render() {
      const { current: n } = this.props.note;
      console.log(n);
      if (this.state.isEditing) {
        return ( // in editing mode
          <div>editing</div>
        //   <Container id="editingPage">

        //     <Segment>
        //       <Container textAlign="right">
        //         <Button textAlign="right" onClick={this.handleDoneClick}>Update Post</Button>
        //       </Container>
        //       <Form>
        //         <Form.Field
        //           control={TextareaAutosize}
        //           label="Title"
        //           placeholder="Enter Title here"
        //           onChange={this.onInputTitleChange}
        //           useCacheForDOMMeasurements
        //           value={this.state.title}
        //         />
        //         <Form.Field
        //           control={TextareaAutosize}
        //           label="Content"
        //           placeholder="Enter Content here"
        //           onChange={this.onInputContentsChange}
        //           useCacheForDOMMeasurements
        //           value={this.state.content}
        //         />
        //         <Form.Field
        //           control={TextareaAutosize}
        //           label="CoverUrl"
        //           placeholder="Enter CoverUrl here"
        //           onChange={this.onInputCoverURLChange}
        //           useCacheForDOMMeasurements
        //           value={this.state.coverUrl}
        //         />
        //         <Form.Field
        //           control={TextareaAutosize}
        //           label="Tags"
        //           placeholder="Enter Tags here"
        //           onChange={this.onInputTagsChange}
        //           useCacheForDOMMeasurements
        //           value={this.state.tags}
        //         />

        //       </Form>
        //     </Segment>
        //   </Container>
        );
      } else { // Not in editing mode
        return (
          <div> not editing </div>
        //   <Container id="mainpage">
        //     <Grid columns={2} stackable>
        //       <Grid.Column textAlign="center" id="leftSideColumn" verticalAlign="top">
        //         <Image src={post.coverUrl || 'https://media.giphy.com/media/3o85xscgnCWS8Xxqik/giphy.gif'}
        //           alt="cover"
        //           onError={(e) => e.target.src = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6'}
        //           centered
        //           fluid
        //         />
        //         <Header as="h5" textAlign="center" id="textColorWhite" placeholder="No tags">{post.tags || 'No tags'}</Header>
        //       </Grid.Column>
        //       <Grid.Column textAlign="center" verticalAlign="top" id="rightSideColumn">
        //         <Button id="editDeleteButton" onClick={this.handleEditClick}>Edit Post</Button>
        //         <Button id="editDeleteButton" onClick={() => this.props.deletePost(this.props.match.params.postID, this.props.history)}>Delete Post </Button>
        //         <Header as="h1" id="postTitle" textAlign="center" placeholder="Untitled">{post.title || 'No Title'}</Header>
        //         <Segment id="postContent" dangerouslySetInnerHTML={{ __html: marked(post.content || 'No Content') }} />
        //         <Header as="h4" textAlign="center" id="textColorWhite" placeholder="Anonymous">Created by: {post.username || 'Anonymous'}</Header>
        //       </Grid.Column>
        //     </Grid>
        //   </Container>
        );
      }
    }
}


const mapStateToProps = (reduxState) => ({
  note: reduxState.note.current,
});


export default connect(mapStateToProps, { fetchNote, deleteNote, updateNote })(SavedNote);
