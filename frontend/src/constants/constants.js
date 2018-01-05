module.exports = Object.freeze({
    BIGGREENDIALOG: {
        backgroundColor: '#00897B',
        color: '#ffffff',
        width: '70%',
        height: '600px',
        marginTop: '-300px',
        marginLeft: '-35%',
    },    
    SHELVES: [
        {
            id: 1,
            code: 'read',
            description: 'Read'
        },
        {
            id: 2,
            code: 'wantToRead',
            description: 'Want To Read'
        },
        {
            id: 3,
            code: 'currentlyReading',
            description: 'Reading'
        }
    ],
    ACTION_TYPES: {
        ADD_REPO_BEGIN: "ADD_REPO_BEGIN",
        ADD_REPO_SUCCESS: "ADD_REPO_SUCCESS",
        ADD_USER_BEGIN: "ADD_USER_BEGIN",
        ADD_USER_SUCCESS: "ADD_USER_SUCCESS"
    }
  });
