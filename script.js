const excuses = {
    "Late to class": {
        Professional: ["Unexpected transportation issues delayed my arrival."],
        Funny: ["I was fighting for my life against the snooze button."],
        Dramatic: ["Fate itself conspired against my punctuality."],
        "Nigerian Parent": ["If you had woken up earlier this wouldn't happen."],
        Unhinged: ["A pigeon stole my sense of time."]
    },
    "Forgot birthday": {
        Professional: ["I sincerely apologize for overlooking the date."],
        Funny: ["My brain auto-deleted all important events."],
        Dramatic: ["This mistake will haunt me forever."],
        "Nigerian Parent": ["After all I have done for you, this is what you're focusing on?"],
        Unhinged: ["Time is a social construct anyway."]
    },
    "Missed deadline": {
        Professional: ["I encountered unexpected challenges while completing the task."],
        Funny: ["My laptop and motivation both crashed simultaneously."],
        Dramatic: ["The universe had other plans for me."],
        "Nigerian Parent": ["If you had started earlier this wouldn't happen."],
        Unhinged: ["A squirrel hacked my workflow."]
    },
    "Didn't reply": {
        Professional: ["I was occupied and unable to respond promptly."],
        Funny: ["I opened the message, got distracted, and accidentally disappeared."],
        Dramatic: ["Words failed me in that moment."],
        "Nigerian Parent": ["Must I answer every message immediately?"],
        Unhinged: ["I entered a time vortex."]
    },
    "Skipped work": {
        Professional: ["I was unable to attend due to unforeseen circumstances."],
        Funny: ["My bed negotiated a contract extension."],
        Dramatic: ["My soul needed a day of reflection."],
        "Nigerian Parent": ["Do you think money grows on trees?"],
        Unhinged: ["The moon advised me to stay home."]
    }
};

async function generateExcuse() {
    const situation = document.getElementById("situation").value;
    const style = document.getElementById("style").value;

    document.getElementById("result").innerText = "Generating... 🤖";

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: `Generate a ${style} excuse for: ${situation}. Keep it short and creative.` }
                ]
            })
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        document.getElementById("result").innerText = data.choices[0].message.content;

    } catch (err) {
        console.error("AI generation failed:", err.message);
        const options = excuses[situation]?.[style];
        const fallback = options
            ? options[Math.floor(Math.random() * options.length)]
            : "No excuse found for that combination.";
        document.getElementById("result").innerText = fallback + " (offline)";
    }
}

function copyExcuse() {
    const excuse = document.getElementById("result").innerText;

    navigator.clipboard.writeText(excuse)
        .then(() => {
            const status = document.getElementById("copyStatus");
            status.innerText = "✅ Copied!";
            setTimeout(() => { status.innerText = ""; }, 2000);
        })
        .catch(() => {
            document.getElementById("copyStatus").innerText = "❌ Failed to copy";
        });
}

function emergencyExcuse() {
    const emergencyExcuses = [
        "I couldn't respond because my WiFi got into a heated argument with my phone and they are currently not on speaking terms.",
        "A random goat appeared in my room and insisted I reconsider my life decisions before continuing work.",
        "My brain entered airplane mode without permission and I am currently negotiating its return.",
        "A sudden wave of motivation hit me so hard I had to lie down and recover.",
        "I opened the app and my laptop started judging me, so I had to stop.",
        "NEPA and my charger formed an alliance against me. I lost.",
        "I was about to be productive but my bed started crying emotionally.",
        "Time skipped 3 hours and I am still investigating how."
    ];

    const random = emergencyExcuses[Math.floor(Math.random() * emergencyExcuses.length)];
    document.getElementById("result").innerText = random;
}

function flashScreen() {
    document.body.style.background = "#2b0000";
    setTimeout(() => { document.body.style.background = ""; }, 200);
}