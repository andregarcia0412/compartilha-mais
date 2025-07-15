let nums = [2,3,1,1,4]

function canJump(nums){
    let maximumDistance = 0
    for(let i = 0; i < nums.length; i++){
        if(i > maximumDistance){
            return false
        }
        maximumDistance = Math.max(maximumDistance, i + nums[i])
    }

    return true
}
console.log(canJump(nums))