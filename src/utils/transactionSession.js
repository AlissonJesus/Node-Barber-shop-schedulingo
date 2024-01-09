import mongoose from "mongoose"

const createSessionConnect = () => {
    let db = mongoose.connection
    let session;
    return {
        init: function () {
            session = db.startSession()
            session.startTransaction()
            return session
        },
        abort: function(){
            session.abortTransaction()
            session.endSession()
        },
        end: function(){
            session.commitTransaction()
            session.endSession()
        }
    }
}

export default createSessionConnect