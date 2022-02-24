function getUniqueId(prefix) {
    return prefix + Math.random().toString(36).substr(2, 9);
}

let app = new Vue ({
    el: '#app',
    data: {
        forms: {
            'reg': { show: false },
            'lib': { show: false },
        }
    },
    methods: {
        
    },
    created(){
    }
})

document.addEventListener('DOMContentLoaded', () => {
    let $elements = document.querySelectorAll('.show').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            app.forms[e.target.dataset.form].show = true;
        });
    });
});