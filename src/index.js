import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBsNazJp3Tzj4EV_DAxhifYU6zfZf1ilO4';

// Create New Component

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [] ,
      selectedVideo: null
    };
    this.videoSearch('The Weeknd');
  }


  videoSearch(term) {
    YTSearch({key: API_KEY, term : term}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo:videos[0]});
    });
  }

  render(){
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch} />
        <VideoDetail video = {this.state.selectedVideo}/>
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
          videos = {this.state.videos} />
      </div>
    );
  }
}

// Put the component's generated Html and put it in DOM

ReactDOM.render(<App/>, document.querySelector('.container'));
