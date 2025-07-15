function isValid(word){
    function isVowel(letter){
        letter = letter.toString().toLowerCase()
        if(letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u"){
            return "vowel"
        } else if(letter >= "a" && letter <= "z"){
            return "consonant"
        } else{
            return "number"
        }
    }

    let hasVowel = false
    let hasConsonant = false
    let hasonlyDigitsAndLetters = false

    if (word.length < 3){
        return false
    }

    for(let i = 0; i < word.length; i++){
        if(isVowel(word[i]) === "vowel"){
            hasVowel = true
        } 
        if(isVowel(word[i]) === "consonant"){
            hasConsonant = true
        }
        if(word[i] != "@" && word[i] != "#" && word[i] != "$"){
            hasonlyDigitsAndLetters = true
        } else{
            return false
        }
    }

    if(hasVowel && hasConsonant && hasonlyDigitsAndLetters){
        return true
    }
    return false
}
