const options = ["None", "Premium", "VIP"];
const state = { dress: 0, bag: 0, shoes: 0 };

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
        const action = arrow.dataset.action;
        if (!action) return;
        const [type, direction] = action.split('-'); // e.g. "dress-left"
        const dir = direction === 'left' ? -1 : 1;
        changeOption(type, dir);
    });
    });

    updatePreview();
});

function changeOption(type, dir) {
    state[type] = (state[type] + dir + options.length) % options.length;
    document.getElementById(type + '-text').innerText = options[state[type]];

    if (type === 'dress') {
    const disabled = state.dress === 0;
    document.querySelector('.control.bag').classList.toggle('disabled', disabled);
    document.querySelector('.control.shoes').classList.toggle('disabled', disabled);
    if (disabled) {
        state.bag = 0; state.shoes = 0;
        document.getElementById('bag-text').innerText = 'None';
        document.getElementById('shoes-text').innerText = 'None';
    }
    }
    updatePreview();
}

function updatePreview() {
    const combo = `${options[state.dress]}_${options[state.bag]}_${options[state.shoes]}`;
    const fileName = combo.replace(/\s+/g, '-').toLowerCase();

    const img = document.getElementById('preview-img');

    // If all options are "None", show placeholder
    if (fileName === "none_none_none") {
        img.src = `/outfits/placeholder.jpg`;
        return;
    }

    img.src = `/outfits/${fileName}.jpg`;
}

function sendQuote() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!phone) { alert('Phone number is required'); return; }
    alert(`Quote requested for: Dress: ${options[state.dress]}, Bag: ${options[state.bag]}, Shoes: ${options[state.shoes]}\nName: ${name}\nPhone: ${phone}`);
}