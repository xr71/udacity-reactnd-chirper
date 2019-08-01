import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'

class Tweet extends Component {

    toParent = (e, id) => {
        e.preventDefault()
        console.log(id)
        console.log("toParent does nothing right now")
    }

    render() {
        //console.log(this.props)

        const { tweet } = this.props

        if (tweet === null) {
            return (
                <p>
                    This tweet does not exist
                </p>
            )
        }

        const { name, avatar, timestamp, likes, hasLiked, text, parent, replies, id } = tweet


        return (
            <div className='tweet'>
                <img 
                    src={avatar}
                    className='avatar'
                    alt={`This is an avatar of ${name}`}
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>
                           {formatDate(timestamp)} 
                        </div>


                        {parent && (
                            <button className='replying-to'
                                onClick={(e) => this.toParent(e, parent.id)}
                            >
                                Replying to @{parent.author}
                            </button>
                        )}

                        <p>{text}</p>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps({tweets, users, authedUser}, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet ? 
            formatTweet(tweet, users[tweet.author], authedUser, parentTweet) :
        null
    }
    
}

export default connect(mapStateToProps)(Tweet)
