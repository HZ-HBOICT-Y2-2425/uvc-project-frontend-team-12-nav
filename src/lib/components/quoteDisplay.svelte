<script>
    export let type = 'shower'; // Default to shower if not provided

    const showerQuotes = [
        "I don’t trust people who don’t shower. What are you hiding?",
        "Shower thoughts: The best way to start your day.",
        "I like my water like I like my humor: Warm and steamy.",
        "Shower beer is the best kind of beer.",
        "Taking a shower is a chance to finally talk to yourself.",
        "I’m just here for the hot water and the thinking time.",
        "Showering is my daily time for reflection and plotting my world domination.",
        "There’s nothing like a good shower to make you feel clean… unless you’re doing it wrong.",
        "Shower: The only place where my singing sounds good.",
        "A good shower is like a mini vacation.",
    ];

    const sinkQuotes = [
        "A clean sink is a sign of a dirty mind.",
        "I came, I saw, I washed my hands.",
        "Sink or swim? I choose sink.",
        "When in doubt, wash your hands.",
        "Life is short. Enjoy the sink while it lasts.",
        "Sink time is me time.",
        "Why do they call it a sink when it's more of a 'think'?"
    ];

    const toiletQuotes = [
        "When nature calls, you must answer!",
        "Flush your worries away!",
        "The throne is the best thinking place.",
        "A royal flush beats a full house.",
        "Don't rush while on the flush!",
        "This is where the magic happens.",
        "You know it's serious business when the door locks.",
        "Always leave the seat up for debate.",
    ];

    let quotes;

    // Determine which quotes array to use based on type
    if (type === 'sink') {
        quotes = sinkQuotes;
    } else if (type === 'toilet') {
        quotes = toiletQuotes;
    } else {
        quotes = showerQuotes; // Default to shower quotes if no valid type specified
    }

    // Check that quotes is defined and has length before choosing a random quote
    let randomQuote = quotes && quotes.length > 0
        ? quotes[Math.floor(Math.random() * quotes.length)]
        : "No quotes available.";
</script>

<div class="quote-container text-lg text-center text-gray-600 mb-6 italic">
    <p class="text-xl font-italic text-black">"{randomQuote}"</p>
</div>

<style>
    .quote-container {
        max-width: 400px;
        margin: 0 auto;
    }
</style>
