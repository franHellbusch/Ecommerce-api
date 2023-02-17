const authApiCall = async (url) => {
    const button = document.getElementById('submitButon')

    button.setAttribute('disabled', true)
    button.classList.add('opacity-50')

    const form = document.getElementById('form');
    const formData = new FormData(form);
    const formDataObj = {};

    for (let [key, value] of formData.entries()) {
        formDataObj[key] = value;
    }

    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formDataObj)
    })

    if (response.ok) {
        window.location.href = `${response.url}`
        return
    }

    const resJson = await response.json() || response
    console.log(resJson)

    const errorMessage = document.getElementById('errorMessage')
    if (errorMessage) {
        errorMessage.remove()
    }

    const buttonContainer = document.getElementById('buttonContainer')
    buttonContainer.insertAdjacentHTML("beforeBegin", `<div id="errorMessage" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span class="font-medium">${resJson.message}</span>
    </div>`);


    document.getElementById('submitButon').removeAttribute("disabled")
    document.getElementById('submitButon').classList.remove('opacity-50')

    setTimeout(() => {
        document.getElementById('errorMessage').remove()
    }, 3000)
}

const validateEmail = (e) => {
    const emailValue = e?.value
    const emailInput = document.getElementById('emailInput')
    emailInput.classList.remove('focus:border-indigo-500')

    if (emailValue.includes('@') & emailValue.includes('.')) {
        emailInput.classList.add('focus:border-green-500')
        return true
    }
    else {
        emailInput.classList.remove('focus:border-green-500')
        emailInput.classList.add('focus:border-red-600')
        return false
    }
}

const validatePassword = (e) => {
    const passwordValue = e?.value
    const passwordInput = document.getElementById('passwordInput')
    passwordInput.classList.remove('focus:border-indigo-500')

    if (passwordValue.length >= 8) {
        passwordInput.classList.add('focus:border-green-500')
        return true
    }
    else {
        passwordInput.classList.remove('focus:border-green-500')
        passwordInput.classList.add('focus:border-red-600')
        return false
    }
}