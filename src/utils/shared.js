
const processTimesBySlots = (time, timeOneSlot) => {
    console.log(typeof time)
    return Math.ceil(time/timeOneSlot)
}




export {processTimesBySlots}