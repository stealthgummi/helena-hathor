// Preloaded Curated Flashcard Decks for The Natal Crucible Bundle
// Infused with Helena's Empowered Voice & Grounded Wisdom (Calibrated at 78% Sweet Spot)
const DEFAULT_DECKS = [
  {
    "id": "morning-ignition",
    "title": "🌅 Morning Cosmic Ignition & Aligned Goals",
    "icon": "☀️",
    "tagline": "Daily Elemental Awakenings, Intention Alchemy & Nervous System Priming",
    "description": "32 powerful morning cards to ground your energy, set magnetic intentions, align your nervous system with your natal elements, and claim your power moves before the world asks for your attention.",
    "cards": [
      {
        "q": "🔥 Fire Signs (Aries, Leo, Sagittarius) — Morning Ignition",
        "a": "Good morning, fire starter! Listen to me: what is the single boldest move you can make today that genuinely lights your soul up?\n\nStop asking for permission or apologizing for having big energy. Channel that flame into creation today, not hesitation.",
        "hint": "Bold Action, Courage & Passion"
      },
      {
        "q": "🌱 Earth Signs (Taurus, Virgo, Capricorn) — Morning Grounding",
        "a": "Take a slow, deep breath in and feel your feet on the floor. Before you rush into your to-do list, ask: 'What is the 20% of work that will actually create 80% of my peace and progress today?'\n\nNourish your physical vessel first. Steadiness is your superpower.",
        "hint": "Somatic Grounding & High-Leverage Focus"
      },
      {
        "q": "🌬️ Air Signs (Gemini, Libra, Aquarius) — Morning Clarity",
        "a": "Before you open your phone and let 50 different voices scramble your head, get clear on your own story today.\n\nAre you creating your narrative, or are you drowning in noise? Pick your top focus, speak your truth with kindness, and keep it simple.",
        "hint": "Mental Discipline & Clear Voice"
      },
      {
        "q": "🌊 Water Signs (Cancer, Scorpio, Pisces) — Morning Intuition",
        "a": "Check in with your heart before you check in with the world, babe. What is your emotional climate this morning, and what gentle boundary do you need to protect your peace?\n\nYou don't have to carry everyone else's storm. Anchor in your own calm waters.",
        "hint": "Energetic Boundaries & Intuitive Guidance"
      },
      {
        "q": "♈ Aries Morning Focus — Igniting the Pioneer",
        "a": "Wake up and claim your courage! Where have you been waiting around for someone else to give you the green light?\n\nHelena's Challenge: Pick that one thing you've been hesitating on and take the very first baby step before noon. You've got the fire—use it.",
        "hint": "Aries Awakening"
      },
      {
        "q": "♉ Taurus Morning Sensory Alignment — Grounded Luxury",
        "a": "Savor your coffee or tea with all five senses this morning. Slow down your breath.\n\nRemind yourself that rushing is an illusion that drains your magnetism. Your calm, grounded presence is the exact energy that attracts abundance.",
        "hint": "Taurus Grounding"
      },
      {
        "q": "♊ Gemini Morning Mental Filter — Choosing Your Focus",
        "a": "Your brilliant mind wants to pursue 10 different ideas at once today. Don't scatter your magic, sista!\n\nWrite down your top 3 ideas, circle only ONE to pour your creative focus into, and let the rest simmer for tomorrow.",
        "hint": "Gemini Focus"
      },
      {
        "q": "♋ Cancer Morning Emotional Sanctuary — Tender Strength",
        "a": "Put your hand on your heart before you face the world. What does your spirit need today to feel completely safe and nourished?\n\nSet your boundary early: you can love people deeply without letting them deplete your energy tank.",
        "hint": "Cancer Self-Nurturing"
      },
      {
        "q": "♌ Leo Morning Solar Radiance — Shining from Heart-Center",
        "a": "You are the warmth of the room! How can you lead today with pure generosity and creative delight?\n\nWear something that makes you feel vibrant, stand tall, and share a genuine, uplifting compliment with someone who needs it.",
        "hint": "Leo Radiance"
      },
      {
        "q": "♍ Virgo Morning Aligned Order — Practical Magic",
        "a": "Take a breath and drop the impossible standard. You don't have to fix the whole universe before lunch!\n\nFocus on devotion over perfection. Clear your physical desk, drink a tall glass of water, and trust that your best effort is more than enough.",
        "hint": "Virgo Practical Devotion"
      },
      {
        "q": "♎ Libra Morning Equilibrium — Honoring Your Voice",
        "a": "Before you bend over backward trying to make everyone else comfortable today, ask yourself: 'What do I actually want right now?'\n\nTrue harmony isn't pleasing others at your own expense. Stand in graceful, unapologetic self-respect.",
        "hint": "Libra Authentic Harmony"
      },
      {
        "q": "♏ Scorpio Morning Sovereign Power — X-Ray Vision",
        "a": "Tune into your gut intuition. What subtle truth have you been picking up on that you need to honor today?\n\nHold your cards close, don't waste energy on petty drama, and trust that inner knowing—it never lies to you.",
        "hint": "Scorpio Sovereignty"
      },
      {
        "q": "♐ Sagittarius Morning Vision — Expanding Your Horizon",
        "a": "What grand adventure or inspiring truth is calling your spirit today?\n\nListen to an uplifting podcast, learn something fascinating, and bring your contagious optimism into every conversation you have.",
        "hint": "Sagittarius Expansion"
      },
      {
        "q": "♑ Capricorn Morning Master Blueprint — Building the Empire",
        "a": "You are here to build lasting legacy, brick by intentional brick. Don't let temporary chaos derail your focus.\n\nDefine your #1 high-impact move for today, execute it with quiet confidence, and remember to celebrate your progress.",
        "hint": "Capricorn Strategic Mastery"
      },
      {
        "q": "♒ Aquarius Morning Awakening — Honoring Your Originality",
        "a": "The world has enough copies—it needs your unique, quirky, visionary perspective!\n\nSpeak up with an unconventional idea today. Stop worrying about whether you fit into the standard box. You were born to redefine it.",
        "hint": "Aquarius Visionary Truth"
      },
      {
        "q": "♓ Pisces Morning Spiritual Download — Magic in the Mundane",
        "a": "What did your dreams whisper to you last night? Anchor that spiritual magic into your real day.\n\nSet the intention to notice beauty and synchronicity in everyday moments, while keeping your practical feet grounded on the earth.",
        "hint": "Pisces Intuitive Grounding"
      },
      {
        "q": "☀️ High-Vibe Goal Setting: Overflow vs. Scarcity Hustle",
        "a": "Look at today's priorities and be honest with yourself: 'Am I doing this from excitement, service, and overflow—or am I running on fear, lack, and feeling like I have to prove my worth?'\n\nChoose 1 to 3 intentions that feel expansive, not exhausting.",
        "hint": "Magnetic Intention Setting"
      },
      {
        "q": "🎯 The 'One Non-Negotiable Power Move' Rule",
        "a": "If you could only accomplish ONE single task today that would make you feel deeply proud and magnetically aligned when your head hits the pillow tonight—what is it?\n\nPut that first. Everything else is secondary.",
        "hint": "Eliminating Distraction"
      },
      {
        "q": "🛡️ The Sacred Morning Boundary: Protecting the First 30 Minutes",
        "a": "Listen to me: when you roll over and grab your phone the second your eyes open, you are letting 100 strangers program your nervous system for the day.\n\nGive yourself 30 minutes of breathing, hydration, and peace before you let the digital world in.",
        "hint": "Morning Nervous System Hygiene"
      },
      {
        "q": "💧 Morning Water & Cellular Hydration Blessing",
        "a": "Your body is over 60% water, and water holds energy. As you pour your morning glass, whisper a quiet intention over it: 'I fill my cells with vitality, clarity, and peace.' Drink it slowly and feel the life force return.",
        "hint": "Somatic Vitality"
      },
      {
        "q": "🧘‍♀️ Somatic Breath Activation: Shifting from Rush to Flow",
        "a": "Try this right now: Inhale for 4 seconds, hold for 4 seconds, exhale slowly for 6 seconds. Repeat 3 times.\n\nThat extended exhale tells your nervous system: 'You are safe. You can create from grounded power today instead of panic.'",
        "hint": "Nervous System Regulation"
      },
      {
        "q": "🪞 The Bathroom Mirror Check-In",
        "a": "Look directly into your own eyes in the mirror this morning. Smile and say: 'I see you. I love you. We've got this today no matter what comes up.'\n\nBe your own biggest ally before you walk out the front door.",
        "hint": "Unconditional Self-Support"
      },
      {
        "q": "👑 Stepping into Your 'Future Self' Identity",
        "a": "Ask yourself: 'How would the most confident, grounded, magnetic version of myself walk, speak, and reply to emails today?'\n\nDon't wait until everything is 'perfect' to feel like her. Embody her energy right now.",
        "hint": "Identity Alignment"
      },
      {
        "q": "🚪 The Doorway Energy Threshold Blessing",
        "a": "As you step through your front door or walk into your workspace, take a breath. Say to yourself: 'I leave doubt and worry behind. I enter this space as a clear, radiant channel of joy and value.'",
        "hint": "Energetic Thresholds"
      },
      {
        "q": "💵 Morning Abundance Calibration: Feeling Rich in Spirit",
        "a": "Money is energy that loves appreciation. Before checking your bank app, thank the universe for the warm bed, the running water, and the opportunities heading your way today.\n\nAbundance begins as an internal frequency.",
        "hint": "Abundance Frequency"
      },
      {
        "q": "🗣️ Sacred Throat Chakra Morning Activation",
        "a": "Unclench your neck and hum gently for 20 seconds to wake up your vocal cords. Affirm: 'My voice is valuable. I communicate with clarity, warmth, and authority today, and people love hearing what I have to share.'",
        "hint": "Throat Chakra Empowerment"
      },
      {
        "q": "🔥 Fire Sign Midday Reset — Breaking the Hesitation Loop",
        "a": "Feeling restless or impatient? Pause and take 3 deep breaths. If you knew you were completely supported, what move would you make right now?\n\nStop over-analyzing and take that first step. Momentum creates clarity.",
        "hint": "Instant Alignment & Courage"
      },
      {
        "q": "🌱 Earth Sign Midday Reset — Reclaiming the Vessel",
        "a": "Step away from all screens for two minutes. Drink a glass of water. Unclench your jaw, drop your shoulders down away from your ears, and soften your stomach.\n\nAre you rushing when slowing down would actually make you more powerful?",
        "hint": "Nervous System Softening"
      },
      {
        "q": "🌬️ Air Sign Midday Reset — Clearing Mental Clutter",
        "a": "Close the 15 open browser tabs and put your phone face down. Grab a real pen and paper, write down the ONE priority that actually moves the needle, and do only that until it's done.",
        "hint": "Brain Fog Detox"
      },
      {
        "q": "🌊 Water Sign Midday Reset — Sealing Your Aura",
        "a": "Place your right hand on your heart and your left on your stomach. Repeat: 'I lovingly return any energy that doesn't belong to me, and I call all of my personal power back home to my center.'",
        "hint": "Energetic Sovereignty"
      },
      {
        "q": "⏳ The Law of Divine Timing Morning Reminder",
        "a": "You don't need to force or push the river today, babe. Do your part with love and excellence, and let the universe orchestrate the timing and the results.",
        "hint": "Surrender & Trust"
      },
      {
        "q": "✨ Morning Daily Alignment Mantra",
        "a": "Whisper to your soul: 'Today is a brand new canvas. I choose peace over panic, presence over perfection, and trust over control. I am ready to receive miracles.'",
        "hint": "Morning Daily Mantra"
      }
    ]
  },
  {
    "id": "evening-reflection",
    "title": "🌙 Evening Lunar Reflection & Energetic Release",
    "icon": "🌙",
    "tagline": "Nightly Unwinding, Shadow Checks, Emotional Cleansing & Subconscious Priming",
    "description": "32 restorative evening cards to wash off the day's collective noise, honor what you built, release guilt or perfectionism, and prime your subconscious in theta state for deep healing sleep.",
    "cards": [
      {
        "q": "🔥 Fire Signs — Evening Cooling & Reflection",
        "a": "Time to cool the embers, warrior. Did you channel your fire into creativity and inspiration today, or did you burn through your patience?\n\nWhere did your warmth lift someone up? Give yourself credit, blow out the flame, and let your body rest tonight.",
        "hint": "Sustainable Energy & Self-Awareness"
      },
      {
        "q": "🌱 Earth Signs — Evening Softening & Decompression",
        "a": "Did you let perfectionism or worry steal your peace today? Look at what you built: you showed up and moved mountains in your own steady way.\n\nNow, clock out. Give yourself full permission to unclench and receive restorative sleep.",
        "hint": "Releasing Control & Embracing Rest"
      },
      {
        "q": "🌬️ Air Signs — Evening Brain Dump & Mental Quiet",
        "a": "Your mind has been spinning all day long. Did you spend today stuck in overthinking, or did you take real action?\n\nWrite down any lingering thoughts on a bedside pad so they aren't ping-ponging in your head. Unplug the screen and welcome silence.",
        "hint": "Mental Unplugging & Surrender"
      },
      {
        "q": "🌊 Water Signs — Evening Emotional Wash & Renewal",
        "a": "What feeling did you swallow or push down today to keep someone else happy? Can you let yourself feel it right now and breathe it out gently?\n\nForgive yourself and others for being messy humans today. Wash off the emotional dust.",
        "hint": "Emotional Cleansing & Compassion"
      },
      {
        "q": "♈ Aries Evening Wind-Down — Resting the Warrior",
        "a": "Lay down your sword, babe. You fought hard today, you handled business, and you did enough.\n\nPut your hands on your ribs, feel your steady breath, and give your warrior spirit permission to surrender into deep, restorative sleep.",
        "hint": "Aries Nightly Surrender"
      },
      {
        "q": "♉ Taurus Evening Sensory Sanctuary — Luxuriating in Peace",
        "a": "Wrap yourself in your softest blanket, light a candle, or dab some lavender on your wrists.\n\nSoak in the comfort of your bed and tell yourself: 'I worked with devotion today; now rest is my sacred birthright.'",
        "hint": "Taurus Sensory Comfort"
      },
      {
        "q": "♊ Gemini Evening Mental Stillness — Closing the Tabs",
        "a": "Your brilliant brain processed thousands of thoughts today. Now it's time to power down.\n\nPut your phone across the room. Pick up a relaxing book or simply close your eyes and let your racing thoughts dissolve into stillness.",
        "hint": "Gemini Mental Quiet"
      },
      {
        "q": "♋ Cancer Evening Shell Retreat — Safe in Your Sanctuary",
        "a": "Come back home into your shell, love. The outside world cannot demand anything more from you tonight.\n\nSip a warm tea, cuddle up, and wrap yourself in unconditional self-compassion. You are completely safe here.",
        "hint": "Cancer Emotional Home"
      },
      {
        "q": "♌ Leo Evening Crown Removal — Resting the Radiant Heart",
        "a": "You don't need to perform, entertain, or be the strong one tonight. Take off the crown.\n\nLie back, take a long exhale, and let yourself simply be held by the universe without having to shine for anyone.",
        "hint": "Leo Gentle Restoration"
      },
      {
        "q": "♍ Virgo Evening 'Good Enough' Release — Releasing Perfection",
        "a": "Look at everything that got done today and repeat after me: 'It is enough, and I am enough.'\n\nForgive any unchecked boxes on your list. Tomorrow is a fresh slate; tonight is for sacred healing sleep.",
        "hint": "Virgo Releasing Control"
      },
      {
        "q": "♎ Libra Evening Boundary Restoration — Returning Home to Self",
        "a": "Did you spend your energy keeping everyone else comfortable today? Time to call that energy home.\n\nCut any invisible energetic cords. Remind your heart: 'My worth is not tied to pleasing other people.'",
        "hint": "Libra Energy Reclamation"
      },
      {
        "q": "♏ Scorpio Evening Shadow Alchemy — Releasing the Guard",
        "a": "You don't need to stay in hyper-vigilant defense mode tonight. You are in your private sanctuary.\n\nUnclench your jaw, soften your belly, and exhale any lingering tension or heavy vibes into the night.",
        "hint": "Scorpio Unclenched Peace"
      },
      {
        "q": "♐ Sagittarius Evening Grounding — Bringing the Spirit Home",
        "a": "Your adventurous mind traveled far and wide today. Bring your spirit gently back down into your physical body.\n\nRub a little lotion into your feet, ground into your bed, and thank your body for carrying your wild spirit today.",
        "hint": "Sagittarius Somatic Grounding"
      },
      {
        "q": "♑ Capricorn Evening Burden Laydown — Clocking Out of Duty",
        "a": "You cannot carry the weight of the entire world on your shoulders, and you weren't meant to.\n\nFormally 'clock out' of your responsibilities for the night. Everything will wait until tomorrow. Honor your need for rest.",
        "hint": "Capricorn Clocking Out"
      },
      {
        "q": "♒ Aquarius Evening Collective Unplug — Silencing the Noise",
        "a": "Unplug from the group chats, the news headlines, and the collective anxiety. Give your nervous system a total digital break.\n\nLook out at the stars for a minute and reconnect with the quiet, infinite peace of the cosmos.",
        "hint": "Aquarius Digital Silence"
      },
      {
        "q": "♓ Pisces Evening Dream Gate — Blessing the Subconscious",
        "a": "You soaked in a lot of emotional energy and vibes from the world today. Cleanse your aura before you sleep.\n\nAffirm: 'I release all collective noise and heaviness. I invite healing dreams and deep, nourishing soul rest.'",
        "hint": "Pisces Dream Protection"
      },
      {
        "q": "🕯️ The Daily Gentle Shadow Check: Where Did I Abandon Myself?",
        "a": "Look back over your day with compassion, not judgment: Where did you say 'yes' when your gut wanted to say 'no'? Where did you shrink to keep the peace?\n\nAcknowledge it with love, forgive yourself, and reset your boundary for tomorrow.",
        "hint": "Radical Self-Honesty"
      },
      {
        "q": "✨ Nighttime Celebration: Honoring 3 Human Wins",
        "a": "Before you close your eyes, name 3 wins from today—no matter how small. A boundary held, a kind word spoken, an honest effort made, or simply resting when your body asked for it. Celebrate your progress!",
        "hint": "Abundance Frequency"
      },
      {
        "q": "🛁 The Energetic Shower Ritual: Washing Off the Day",
        "a": "When washing your face or taking an evening shower, visualize the warm water acting as liquid golden light, washing away every drop of stress, tension, and foreign energy straight down the drain.",
        "hint": "Energetic Cleansing"
      },
      {
        "q": "💤 Subconscious Night Priming: Entering Theta State",
        "a": "As your eyelids get heavy, your brain enters the theta state—the gateway to your subconscious. Don't replay old worries. Whisper your core truth: 'I am safe, I am worthy, and everything I desire is unfolding in divine timing.'",
        "hint": "Subconscious Reprogramming"
      },
      {
        "q": "🤝 Forgiving the Human Day: Releasing Self-Criticism",
        "a": "You are a soul having an imperfect human experience. Did you say something awkward? Did you eat something you didn't plan to? Did you fall behind schedule? Forgive yourself right now. Beating yourself up never heals anything.",
        "hint": "Radical Self-Forgiveness"
      },
      {
        "q": "📱 The Digital Sunset: Honoring Your Biology",
        "a": "Blue light tricks your brain into thinking it's high noon, blocking melatonin. Put your phone across the room or on do-not-disturb at least 30 minutes before sleep so your nervous system can settle into natural darkness.",
        "hint": "Biological Rest"
      },
      {
        "q": "🌙 The Lunar Light Check-In: Tuning to the Moon",
        "a": "Check the current moon phase: Is the moon building momentum (waxing), shining full light (culmination), or letting go (waning)? Let your thoughts match the natural rhythm of the night sky.",
        "hint": "Lunar Attunement"
      },
      {
        "q": "🫀 Hand-on-Heart Connection: Reconnecting with Life",
        "a": "Place both hands over the center of your chest. Feel that steady, quiet heartbeat. Without you asking, it beats 100,000 times a day just to keep you here. Send your heart a wave of genuine gratitude.",
        "hint": "Heart-Center Coherence"
      },
      {
        "q": "📜 The 'Worry Box' Bedside Mental Dump",
        "a": "If your mind is looping on tomorrow's tasks, grab a piece of paper. Jot down the 3 things that are bugging you, fold it up, and say: 'You are handled tomorrow. Tonight belongs to my peace.'",
        "hint": "Mental Unburdening"
      },
      {
        "q": "🕊️ Surrendering the 'How': Letting Go of Control",
        "a": "You did what you could today, love. Now release the desperate grip on 'how' and 'when' everything has to happen. Trust that the universe is working behind the scenes on your behalf.",
        "hint": "Law of Detachment at Night"
      },
      {
        "q": "🌿 Evening Herbal & Sensory Soothe for the Vagus Nerve",
        "a": "Sip some warm chamomile, take your magnesium, and inhale deeply through your nose. Exhale with a long, gentle audible sigh. That sigh physically switches your body into rest-and-digest mode.",
        "hint": "Vagus Nerve Soothing"
      },
      {
        "q": "🌌 Cosmic Perspective: You Are Stardust",
        "a": "You are a conscious spark of life living on a gorgeous planet spinning through infinite space. Today's petty frustrations are tiny specks in the grand cosmic picture. Breathe in the wonder of being alive.",
        "hint": "Cosmic Expansion"
      },
      {
        "q": "🛡️ The Nighttime Aura Seal & Dream Protection",
        "a": "Before you drift off, set your energetic boundary: 'I seal my aura in pure divine golden light. Only love, healing, and peace may enter my dream space tonight.'",
        "hint": "Dreamtime Shielding"
      },
      {
        "q": "💫 Releasing the Comparison Trap",
        "a": "Did you see someone's highlight reel online today and feel behind? Remember: their chapter 20 is not your chapter 5. Your path is divinely tailored to your soul's unique timing.",
        "hint": "Releasing Comparison"
      },
      {
        "q": "💎 Bedtime Sovereign Self-Love Declaration",
        "a": "Whisper as you drift to sleep: 'I love who I was today, I love who I am tonight, and I love who I am becoming tomorrow. I am completely worthy of love, rest, and happiness.'",
        "hint": "Bedtime Self-Love"
      },
      {
        "q": "💤 Deep Rest as Sacred Self-Devotion",
        "a": "Sleep is not a luxury you only earn after burning yourself out—sleep is the sacred foundation of your intuition, health, and magnetism. Rest deeply and wake up renewed.",
        "hint": "Sleep as Sacred Restoration"
      }
    ]
  },
  {
    "id": "signs-and-planets",
    "title": "☉🪐 Cosmic Foundations: Signs & Planetary Archetypes",
    "icon": "☉",
    "tagline": "The Big Three, Modalities, 12 Signs & The 10 Planetary Drives",
    "description": "26 cards covering your core blueprint: Sun, Moon, Rising, the 3 modalities, all 12 signs (Superpower, Shadow Trap & Magnetic Truth), plus your inner planetary council from Mercury to Pluto.",
    "cards": [
      {
        "q": "What does your Sun Sign truly represent?",
        "a": "Your Sun is your radiant solar core, conscious ego, and life purpose. It represents who you are actively evolving to become in this lifetime—your inner Queen, your vitality, and where you are meant to shine without apology.",
        "hint": "Core Solar Flame & Life Mission"
      },
      {
        "q": "What does your Moon Sign reveal about your emotional world?",
        "a": "Your Moon is your sacred sanctuary, emotional body, and subconscious instincts. It reveals what you need to feel deeply safe, how you self-soothe in private, and the tender childhood conditioning that runs beneath the surface.",
        "hint": "Inner Sanctuary & Subconscious Instincts"
      },
      {
        "q": "What is the Ascendant (Rising Sign) and why does it matter?",
        "a": "The Ascendant is your energetic front door and outer aura—the sign on the eastern horizon the exact moment you took your first breath. It dictates how you meet the world, how others perceive your vibration, and sets the template for your entire chart houses.",
        "hint": "The Cosmic Aura & First Impression"
      },
      {
        "q": "What are the 3 Modalities and how do they move energy?",
        "a": "• Cardinal (Aries, Cancer, Libra, Capricorn): The Visionaries & Initiators who kick-start new cycles.\n• Fixed (Taurus, Leo, Scorpio, Aquarius): The Anchors & Builders who hold steady focus and master sustained power.\n• Mutable (Gemini, Virgo, Sagittarius, Pisces): The Alchemists & Adaptors who navigate transitions and synthesize wisdom.",
        "hint": "Energetic Movement & Action Styles"
      },
      {
        "q": "♈ Aries (Fire / Cardinal / Ruled by Mars)",
        "a": "• Superpower: Unstoppable courage, pioneer spirit, fearless self-assertion.\n• Shadow Trap: Impatience, burnout, and picking fights out of restlessness.\n• Magnetic Truth: When Aries leads from the heart, they give everyone around them permission to be brave.",
        "hint": "The Pioneer & Warrior"
      },
      {
        "q": "♉ Taurus (Earth / Fixed / Ruled by Venus)",
        "a": "• Superpower: Grounded loyalty, sensual embodiment, unwavering patience, building wealth.\n• Shadow Trap: Stubborn resistance to growth and staying in comfortable ruts.\n• Magnetic Truth: Taurus embodies the art of receiving; their calm presence is pure nervous system medicine.",
        "hint": "The Grounded Queen & Earth Guardian"
      },
      {
        "q": "♊ Gemini (Air / Mutable / Ruled by Mercury)",
        "a": "• Superpower: Sparkling wit, endless curiosity, fast mental connection, multifaceted genius.\n• Shadow Trap: Mental overwhelm, scattered focus, and surface-level detachment.\n• Magnetic Truth: When Gemini channels their brilliance into one focused stream, they become magnetic messengers.",
        "hint": "The Curious Polymath & Messenger"
      },
      {
        "q": "♋ Cancer (Water / Cardinal / Ruled by the Moon)",
        "a": "• Superpower: Fierce emotional intuition, deep empathy, creating sacred sanctuary.\n• Shadow Trap: Retreating into a protective shell, holding resentments, emotional overwhelm.\n• Magnetic Truth: When Cancer honors their own boundaries first, their love and healing presence can move mountains.",
        "hint": "The Sacred Nurturer & Intuitive Anchor"
      },
      {
        "q": "♌ Leo (Fire / Fixed / Ruled by the Sun)",
        "a": "• Superpower: Radiant warmth, creative magnetism, generous heart-centered leadership.\n• Shadow Trap: Needing external validation and fearing being ignored.\n• Magnetic Truth: A Leo who loves themselves unconditionally lights up the whole room without ever needing to perform.",
        "hint": "The Sovereign Luminary & Creative Spark"
      },
      {
        "q": "♍ Virgo (Earth / Mutable / Ruled by Mercury)",
        "a": "• Superpower: Discernment, high standards, holistic devotion, practical magic and healing.\n• Shadow Trap: Harsh self-criticism, anxiety, and impossible perfectionism.\n• Magnetic Truth: When Virgo accepts that imperfection is sacred, their gift of refinement transforms everything they touch.",
        "hint": "The Sacred Alchemist & Devoted Healer"
      },
      {
        "q": "♎ Libra (Air / Cardinal / Ruled by Venus)",
        "a": "• Superpower: Diplomacy, aesthetic grace, creating harmony, seeing every perspective.\n• Shadow Trap: People-pleasing, conflict avoidance, and losing self-identity in partnership.\n• Magnetic Truth: Real peace isn't keeping people comfortable; it's standing in graceful, unshakeable self-respect.",
        "hint": "The Aesthetic Harmonizer & Diplomat"
      },
      {
        "q": "♏ Scorpio (Water / Fixed / Ruled by Pluto & Mars)",
        "a": "• Superpower: Deep emotional truth, intuitive x-ray vision, unyielding loyalty, psychic resilience.\n• Shadow Trap: Hyper-vigilance, paranoia, holding onto grudges to feel in control.\n• Magnetic Truth: Scorpio's greatest power is vulnerability—transforming past wounds into sovereign, unshakable wisdom.",
        "hint": "The Mystic Phoenix & Truth-Teller"
      },
      {
        "q": "♐ Sagittarius (Fire / Mutable / Ruled by Jupiter)",
        "a": "• Superpower: Expansive optimism, philosophical vision, thirst for freedom and truth.\n• Shadow Trap: Spiritual bypassing, dogmatic preachiness, escaping reality when things get messy.\n• Magnetic Truth: Sagittarius reminds us that life is an adventure meant to be lived with an open mind and wild joy.",
        "hint": "The Cosmic Seeker & Free Spirit"
      },
      {
        "q": "♑ Capricorn (Earth / Cardinal / Ruled by Saturn)",
        "a": "• Superpower: Unmatched resilience, executive mastery, long-term vision, disciplined integrity.\n• Shadow Trap: Workaholism, emotional guarding, tying self-worth solely to achievements.\n• Magnetic Truth: Capricorn is the master architect; when they trust their heart as much as their work ethic, they build lasting empires.",
        "hint": "The Master Architect & Sovereign Elder"
      },
      {
        "q": "♒ Aquarius (Air / Fixed / Ruled by Uranus & Saturn)",
        "a": "• Superpower: Visionary innovation, humanitarian heart, unapologetic authenticity, collective awareness.\n• Shadow Trap: Intellectual coldness, emotional detachment, rebellion just for the sake of it.\n• Magnetic Truth: Aquarius is here to break outdated rules and build an inclusive future where everyone gets to be free.",
        "hint": "The Cosmic Rebel & Visionary"
      },
      {
        "q": "♓ Pisces (Water / Mutable / Ruled by Neptune & Jupiter)",
        "a": "• Superpower: Boundless compassion, artistic channel, psychic sensitivity, divine connection.\n• Shadow Trap: Escapism, playing the martyr, blurry energetic boundaries.\n• Magnetic Truth: When Pisces grounds their magic into daily rituals, they become a living channel for miracles and unconditional love.",
        "hint": "The Mystic Dreamer & Divine Channel"
      },
      {
        "q": "Mercury (☿) — Your Mental Operating System",
        "a": "Mercury governs your thought patterns, communication style, voice, and how you process information. It reveals how you speak your truth, what kind of books or ideas stimulate you, and how your nervous system handles mental stimuli.",
        "hint": "The Voice, Intellect & Messenger"
      },
      {
        "q": "Venus (♀) — Your Magnetic Frequency & Worth",
        "a": "Venus is your personal frequency of pleasure, beauty, romance, and financial receiving. It shows how you love, what makes you feel adored, your aesthetic taste, and the relationship you have with your intrinsic self-worth and wealth mindset.",
        "hint": "Magnetism, Love & Abundance"
      },
      {
        "q": "Mars (♂) — Your Sacred Drive & Inner Warrior",
        "a": "Mars is your physical fuel, sexual drive, ambition, and courage to assert boundaries. It shows how you take initiative, how you pursue what you desire, and how you channel anger into focused, constructive momentum instead of explosive reactivity.",
        "hint": "Courage, Passion & Boundaries"
      },
      {
        "q": "Jupiter (♃) — The Cosmic Expander & Faith",
        "a": "Jupiter is the archetype of abundance, higher wisdom, luck, and expansion. Where Jupiter sits in your chart reveals where the Universe naturally opens doors for you, where you find optimism, and where your faith can move mountains.",
        "hint": "Grace, Expansion & Higher Vision"
      },
      {
        "q": "Saturn (♄) — The Master Teacher & Spine Builder",
        "a": "Saturn is not your enemy—Saturn is your inner master builder. It rules discipline, boundaries, patience, maturity, and longevity. Saturn shows where life requires 10,000 hours of devoted craft, rewarding you with unshakeable authority and lasting legacy.",
        "hint": "Mastery, Accountability & Legacy"
      },
      {
        "q": "Uranus (♅) — The Cosmic Disruptor & Innovator",
        "a": "Uranus brings sudden awakenings, breakthroughs, and radical liberation. It shakes you out of complacency, destroys obsolete dogma, and pushes you to embrace your weird, eccentric, visionary genius without asking for anyone's permission.",
        "hint": "Breakthroughs, Freedom & Originality"
      },
      {
        "q": "Neptune (♆) — The Mystical Channel & Dreamweaver",
        "a": "Neptune connects you to the realm of dreams, psychic intuition, spiritual surrender, and pure artistic imagination. It teaches you to flow with the unseen mysteries of life while cautioning against illusion, escapism, and wearing rose-colored glasses.",
        "hint": "Intuition, Spirit & Surrender"
      },
      {
        "q": "Pluto (♇) — The Phoenix of Soul Rebirth",
        "a": "Pluto is your inner alchemist. It governs shadow work, raw psychological truth, taboo topics, and sacred death-and-rebirth cycles. Pluto strips away whatever is false so your most sovereign, magnetic personal power can rise from the ashes.",
        "hint": "Shadow Alchemy, Power & Transformation"
      },
      {
        "q": "What is the difference between Personal, Social, and Transpersonal Planets?",
        "a": "• Personal (Sun, Moon, Mercury, Venus, Mars): Fast-moving; they shape your daily personality, choices, emotional wiring, and intimate relationships.\n• Social (Jupiter, Saturn): Moderate speed; they guide how you fit into society, career structures, and cultural growth.\n• Transpersonal (Uranus, Neptune, Pluto): Slow generational catalysts; they drive spiritual awakening, collective rebirth, and deep soul missions.",
        "hint": "Cycle Speed & Psychological Scale"
      },
      {
        "q": "What does Planetary Dignity (Domicile, Exaltation, Detriment, Fall) mean?",
        "a": "Planetary dignity shows how comfortably a planet's natural essence expresses itself in a given zodiac environment. Domicile is in its own home; Exalted is treated like an honored queen; Detriment must work through tension; Fall must innovate and find its own unique strength through adversity.",
        "hint": "Planetary Comfort & Expression"
      }
    ]
  },
  {
    "id": "houses-aspects-synastry",
    "title": "🏛️📐 The Blueprint in Action: Houses, Aspects & Synastry",
    "icon": "🏛️",
    "tagline": "12 Life Arenas, Sacred Aspect Geometry, Vocational Blueprint & Love Synastry",
    "description": "28 cards mapping the 12 Houses of Destiny with Helena's Soul Questions, major aspects (conjunction to quincunx), T-Squares, Grand Trines, the Vocational Blueprint, and deep relational synastry.",
    "cards": [
      {
        "q": "1st House — The Arena of Self & Vitality (Ascendant)",
        "a": "• Life Arena: Physical body, appearance, outward demeanor, first impressions, vitality, personal identity.\n• Helena's Soul Question: 'Who am I when I walk into a room, and how do I boldly show up as my authentic self?'",
        "hint": "Identity & Outer Persona"
      },
      {
        "q": "2nd House — The Arena of Wealth & Self-Worth",
        "a": "• Life Arena: Earned income, material possessions, financial security, tangible gifts, intrinsic self-worth.\n• Helena's Soul Question: 'What do I allow myself to receive, own, and stand on? Does my net worth match my self-worth?'",
        "hint": "Money, Values & Abundance Mindset"
      },
      {
        "q": "3rd House — The Arena of Voice & Mind",
        "a": "• Life Arena: Daily communication, local community, siblings, short trips, early education, thought processing speed.\n• Helena's Soul Question: 'How am I speaking my truth, connecting with my everyday circle, and honoring my voice?'",
        "hint": "Communication & Daily Environment"
      },
      {
        "q": "4th House — The Arena of Sanctuary & Roots (Imum Coeli)",
        "a": "• Life Arena: Home, ancestral lineage, childhood memories, emotional safety foundation, private personal world.\n• Helena's Soul Question: 'Where do I plant my roots so my soul feels completely safe and nourished?'",
        "hint": "Home, Ancestry & Inner Security"
      },
      {
        "q": "5th House — The Arena of Joy, Romance & Creation",
        "a": "• Life Arena: Creative expression, romance, butterflies, play, hobbies, children, joy, bold authentic spotlight.\n• Helena's Soul Question: 'What brings my inner child alive with wild laughter, passion, and uninhibited creative magic?'",
        "hint": "Romance, Play & Inner Child"
      },
      {
        "q": "6th House — The Arena of Wellness & Daily Craft",
        "a": "• Life Arena: Daily routines, physical health, work environment, habits, daily service, nervous system maintenance.\n• Helena's Soul Question: 'What daily sacred rituals and boundaries keep my physical vessel and mind running in harmony?'",
        "hint": "Daily Rituals, Health & Devoted Craft"
      },
      {
        "q": "7th House — The Arena of Sacred Partnerships (Descendant)",
        "a": "• Life Arena: Committed relationships, marriage, business partnerships, one-on-one soul contracts, interpersonal mirroring.\n• Helena's Soul Question: 'Who do I choose to walk beside, and what qualities are they reflecting back to me?'",
        "hint": "Committed Unions & Soul Mirrors"
      },
      {
        "q": "8th House — The Arena of Shadow Alchemy & Rebirth",
        "a": "• Life Arena: Intimacy, shared finances, vulnerability, inheritances, occult wisdom, deep psychology, death & rebirth.\n• Helena's Soul Question: 'What false mask am I ready to release so I can experience profound intimacy and sovereign power?'",
        "hint": "Shared Wealth, Intimacy & Phoenix Rebirth"
      },
      {
        "q": "9th House — The Arena of Higher Wisdom & Horizon",
        "a": "• Life Arena: Philosophy, higher learning, worldview, spiritual truth, long-distance pilgrimages, publishing.\n• Helena's Soul Question: 'What higher truth and expansive horizon is calling me to expand beyond my current comfort zone?'",
        "hint": "Spiritual Pilgrimage & Broad Mindsets"
      },
      {
        "q": "10th House — The Arena of Legacy & Calling (Midheaven)",
        "a": "• Life Arena: Professional reputation, public status, master career, leadership, authority, the legacy that outlives you.\n• Helena's Soul Question: 'What mountain am I climbing, and what lasting impact will my work leave on this world?'",
        "hint": "Career Summit & Public Legacy"
      },
      {
        "q": "11th House — The Arena of Soul Tribe & Future Visions",
        "a": "• Life Arena: Friendships, collective networks, community movements, long-term dreams for humanity, aligned alliances.\n• Helena's Soul Question: 'Who is my aligned soul tribe, and what kind of uplifting future are we co-creating together?'",
        "hint": "Community, Alliances & Collective Dreams"
      },
      {
        "q": "12th House — The Arena of the Mystic Void & Spirit",
        "a": "• Life Arena: The subconscious mind, dreams, karma, spiritual retreat, intuition, unseen support, releasing self-sabotage.\n• Helena's Soul Question: 'What do I need to release to the Universe so I can rest in the deep, peaceful embrace of the divine?'",
        "hint": "Solitude, Surrender & Subconscious Truth"
      },
      {
        "q": "What is a Conjunction (0°)?",
        "a": "Two planets sitting in the exact same degree of the zodiac. Their energies fuse completely into a single, powerhouse voice. It creates extraordinary laser focus and charisma, but requires conscious awareness because you may lack outside perspective on that blended energy.",
        "hint": "Energetic Fusion & Powerhouse Focus"
      },
      {
        "q": "What is a Sextile (60°)?",
        "a": "A collaborative 60-degree angle between complementary elements (Fire & Air, or Earth & Water). It represents natural talents and sparkling opportunities. It whispers: 'The door is open, but you must choose to take action and walk through it.'",
        "hint": "Gentle Opportunity & Cultivated Talent"
      },
      {
        "q": "What is a Square (90°)?",
        "a": "A high-tension 90-degree angle between signs of the same modality. It produces internal friction, restlessness, and clash. This friction is not a curse—it is the sacred catalyst that forces problem-solving, resilience, and your greatest lifetime breakthroughs.",
        "hint": "The Sacred Catalyst & Growth Engine"
      },
      {
        "q": "What is a Trine (120°)?",
        "a": "A harmonious 120-degree angle between planets in the same element. It creates effortless, golden flow and instinctive genius. The only risk: taking your innate gift for granted and becoming complacent without applied discipline.",
        "hint": "Golden Flow & Innate Grace"
      },
      {
        "q": "What is an Opposition (180°)?",
        "a": "Two planets sitting directly across the wheel from each other. It creates an energetic tug-of-war that you often project onto others until you learn to integrate both polarities within yourself. It teaches balance, compromise, and wholeness.",
        "hint": "The Polar Mirror & Integration"
      },
      {
        "q": "What is a Quincunx / Inconjunct (150°)?",
        "a": "An awkward 150-degree angle between signs that share neither element nor modality. It creates a subtle, nagging tension that cannot be directly resolved through confrontation; it requires continual, practical adjustments and flexibility.",
        "hint": "Continual Adaptation & Recalibration"
      },
      {
        "q": "What is an 'Orb' in astrological aspects?",
        "a": "The allowable margin of degrees from an exact geometric aspect. For example, if two planets are 88° apart, they are within a 2° orb of a 90° square. Tighter orbs (0° to 2°) are felt with intense potency in your day-to-day psychology.",
        "hint": "Degree Margin of Potency"
      },
      {
        "q": "What is a 'T-Square' configuration?",
        "a": "Two planets in opposition that both make a 90° square to a third planet (the 'apex' or focal planet). It creates immense energetic pressure that discharges through the apex planet, driving people to achieve extraordinary, historic mastery.",
        "hint": "Dynamic Pressure & Master Achievement"
      },
      {
        "q": "What is a 'Grand Trine'?",
        "a": "Three planets forming three 120° trines across an equilateral triangle in the same element (e.g. Water Grand Trine). It gives profound emotional resilience, natural luck, or creative flow. To unlock its full power, you must pair it with Saturnian discipline.",
        "hint": "Equilateral Harmony & Abundant Flow"
      },
      {
        "q": "Which chart placements form the 'Vocational Blueprint' for wealth and career?",
        "a": "• The Midheaven (MC): Your public reputation and apex calling\n• 10th House: Your career trajectory and societal impact\n• 2nd House: Earned income, self-worth, and what you get paid for\n• 6th House: Daily craftsmanship, workflow, and systems\n• Saturn: Where longevity, mastery, and unshakeable authority are built over time.",
        "hint": "The Vocational Blueprint"
      },
      {
        "q": "What is Synastry in astrology?",
        "a": "The art of laying two natal charts side-by-side to illuminate how two souls interact: where chemistry sparks, where emotional triggers live, how communication flows, and what karmic lessons you are destined to teach one another.",
        "hint": "Relationship Chemistry & Soul Contracts"
      },
      {
        "q": "What does Saturn represent in relationship synastry?",
        "a": "Saturn is the 'cosmic glue.' Favorable Saturn connections (like Saturn trine Venus or Sun) create deep loyalty, maturity, mutual respect, and the endurance to stay together through life's storms, rather than fleeing at the first sign of friction.",
        "hint": "Endurance, Commitment & Cosmic Glue"
      },
      {
        "q": "How does the Descendant (7th House Cusp) shape your romantic attraction?",
        "a": "The sign on your Descendant often represents qualities you have subconsciously disowned in yourself. As a result, you are magnetically drawn to partners who outwardly embody those traits—until you realize your soul wants you to integrate that power yourself.",
        "hint": "Attraction to the Disowned Self"
      },
      {
        "q": "How do you distinguish between a 2nd House job vs. a 10th House career legacy?",
        "a": "The 2nd House represents the work that pays your immediate bills and uses your practical skills. The 10th House represents your magnum opus—the higher public mission, leadership, and sacred legacy your soul is here to build for the world.",
        "hint": "Cashflow vs. Overarching Legacy"
      },
      {
        "q": "What does Chiron reveal in relationship dynamics?",
        "a": "Chiron is the 'Wounded Healer.' In relationships, Chiron highlights your tender vulnerability and childhood wounds (like fear of abandonment or feeling unworthy). When handled with empathy, it becomes the portal for your deepest mutual healing.",
        "hint": "Vulnerability & The Sacred Wound"
      },
      {
        "q": "How do the Midheaven (MC) and North Node work together?",
        "a": "The Midheaven is your external career mountain—the title, reputation, and public recognition. The North Node is your internal spiritual compass—your soul's growth edge and evolutionary destiny. When you align both, your career becomes your soul's calling.",
        "hint": "Public Success Meets Spiritual Destiny"
      }
    ]
  },
  {
    "id": "cosmic-mastery-hard",
    "title": "🔥 Bonus Mastery Deck: Deep-Dive Synthesis",
    "icon": "💎",
    "tagline": "Advanced Astrological Mastery, Corrective Remedies & Mindset Science",
    "description": "54 advanced synthesis cards: challenging aspect corrective remedies (Mars-Saturn, Moon-Pluto, Jupiter-Saturn), house mechanics, synastry deep dives, neuroscience of manifestation, and lunar alchemy.",
    "cards": [
      {
        "q": "What are the three components that comprise the foundational trinity of an astrological identity?",
        "a": "The Cosmic Big Three:\n1. The Sun Sign (Core Solar Identity & Life Purpose)\n2. The Moon Sign (Subconscious Sanctuary, Instincts & Emotional Safety)\n3. The Rising Sign / Ascendant (Outer Aura, Lens on Reality & Social Mask).",
        "hint": "The Cosmic Big Three"
      },
      {
        "q": "What core birth data requirement is necessary to accurately calculate the Rising Sign (Ascendant)?",
        "a": "Exact birth time (to the minute) and birth location. Because the Earth's rotation causes the Ascendant sign on the eastern horizon to shift roughly every two hours (1 degree every 4 minutes), an incorrect time scrambles all 12 house cusps.",
        "hint": "Exact Birth Time & Location"
      },
      {
        "q": "Sun Sign — Core Astrological Function",
        "a": "Represents the essential self, conscious ego, life direction, and core purpose into which an individual grows over a lifetime. It is the solar engine of vitality and creative self-expression.",
        "hint": "Conscious Vitality & Purpose"
      },
      {
        "q": "Moon Sign — Core Astrological Function",
        "a": "Governs private emotional needs, subconscious patterns, childhood conditioning, intuitive instincts, and what an individual requires to feel emotionally safe and nourished.",
        "hint": "Subconscious Security & Emotional Truth"
      },
      {
        "q": "Rising Sign (Ascendant) — Core Astrological Function",
        "a": "Defines the physical vitality, social style, outward energetic presentation, and first impressions perceived by others before knowing the person deeply. It sets the cusp of the 1st House.",
        "hint": "Energetic Aura & First Impression"
      },
      {
        "q": "Mercury — Core Psychological Function",
        "a": "The personal planet governing mental activity, intellect, processing speed, learning styles, perception, and communication style.",
        "hint": "Mind, Logic & Communication"
      },
      {
        "q": "Venus — Core Psychological Function",
        "a": "The personal planet governing love, attraction, beauty, personal values, self-worth, and relationship dynamics, as well as the capacity to receive abundance.",
        "hint": "Love, Magnetism & Self-Worth"
      },
      {
        "q": "Mars — Core Psychological Function",
        "a": "The personal planet controlling physical drive, action, assertiveness, energy, passion, sexual vitality, and healthy boundary enforcement.",
        "hint": "Action, Fuel & Boundaries"
      },
      {
        "q": "Jupiter — Core Psychological Function",
        "a": "A social planet governing expansion, wisdom, spiritual growth, optimism, philosophy, faith, and where luck and abundance naturally flow.",
        "hint": "Expansion, Faith & Good Fortune"
      },
      {
        "q": "Saturn — Core Psychological Function",
        "a": "A social planet imposing structure, discipline, responsibility, boundaries, limitations, and long-term mastery through dedicated life lessons.",
        "hint": "Structure, Discipline & Longevity"
      },
      {
        "q": "Uranus — Core Psychological Function",
        "a": "A transpersonal planet that acts as a catalyst for innovation, sudden breakthroughs, revolution, unexpected change, liberation, and eccentric originality.",
        "hint": "Awakening, Innovation & Freedom"
      },
      {
        "q": "Neptune — Core Psychological Function",
        "a": "A transpersonal planet inspiring dreams, spirituality, intuition, idealism, mystical connection, artistic imagination, and dissolving ego boundaries.",
        "hint": "Mysticism, Dreams & Surrender"
      },
      {
        "q": "Pluto — Core Psychological Function",
        "a": "A transpersonal planet driving radical rebirth, soul power, deep psychological healing, shadow alchemy, and total transformation from the ashes.",
        "hint": "Rebirth, Shadow Work & Sovereignty"
      },
      {
        "q": "How are the ten planets categorized based on their cycle speed and psychological domain?",
        "a": "1. Personal Planets (Sun, Moon, Mercury, Venus, Mars): Move rapidly; govern individual personality, daily behaviors, and emotional wiring.\n2. Social Planets (Jupiter, Saturn): Moderate cycles; govern societal integration, maturity, and structured growth.\n3. Transpersonal Planets (Uranus, Neptune, Pluto): Move very slowly; catalyze generational shifts, collective awakenings, and deep soul evolution.",
        "hint": "Personal, Social & Transpersonal"
      },
      {
        "q": "1st House — Developmental Life Sphere",
        "a": "Developmental Sphere: Self & Identity. Governs physical appearance, the Rising Sign, vitality, and public self-presentation.",
        "hint": "Ascendant / House of Self"
      },
      {
        "q": "2nd House — Developmental Life Sphere",
        "a": "Developmental Sphere: Money & Values. Governs earned income, material possessions, financial security, and personal self-worth.",
        "hint": "House of Values & Resources"
      },
      {
        "q": "3rd House — Developmental Life Sphere",
        "a": "Developmental Sphere: Communication & Mind. Governs local environment, siblings, everyday speech, short trips, and early learning.",
        "hint": "House of Mind & Communication"
      },
      {
        "q": "4th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Home & Family (Imum Coeli). Governs domestic life, family upbringing, ancestral roots, and inner emotional security.",
        "hint": "House of Sanctuary & Roots"
      },
      {
        "q": "5th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Creativity & Romance. Governs self-expression, children, romantic passion, playfulness, and joyful leisure.",
        "hint": "House of Joy, Pleasure & Creation"
      },
      {
        "q": "6th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Work & Health. Governs daily routines, physical wellness, workplace skills, somatic habits, and devoted service.",
        "hint": "House of Health & Daily Rituals"
      },
      {
        "q": "7th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Partnerships & Relationships (Descendant). Governs marriage, committed partnerships, contracts, and one-on-one bonds.",
        "hint": "House of Committed Union"
      },
      {
        "q": "8th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Transformation & Shared Assets. Governs joint finances, intimacy, vulnerability, shadow psychology, and personal rebirth.",
        "hint": "House of Rebirth & Merged Power"
      },
      {
        "q": "9th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Expansion & Higher Learning. Governs long-distance travel, philosophy, religion, higher education, and broad worldview.",
        "hint": "House of Higher Wisdom"
      },
      {
        "q": "10th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Career & Public Status (Midheaven). Governs professional ambitions, public reputation, social standing, and legacy.",
        "hint": "House of Public Standing & Legacy"
      },
      {
        "q": "11th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Social Life & Goals. Governs friendships, soul community, humanitarian networks, and long-term future visions.",
        "hint": "House of Community & Hopes"
      },
      {
        "q": "12th House — Developmental Life Sphere",
        "a": "Developmental Sphere: Subconscious & Inner World. Governs solitude, hidden patterns, spiritual retreat, intuition, and releasing self-undoing.",
        "hint": "House of Solitude & Spirit"
      },
      {
        "q": "What are the structural house classifications in astrology, and which houses belong to each?",
        "a": "1. Angular Houses (1, 4, 7, 10): The Pillars of Action that drive immediate life changes and establish core foundations.\n2. Succedent Houses (2, 5, 8, 11): The Stabilizers that provide security, financial backing, personal purpose, and endurance.\n3. Cadent Houses (3, 6, 9, 12): The Learning Arenas focused on mental exchange, adaptability, transitions, and spiritual synthesis.",
        "hint": "Angular, Succedent & Cadent Houses"
      },
      {
        "q": "What defines the four Angular Houses as the primary pillars of action?",
        "a": "The 1st House (Ascendant / Self), 4th House (Imum Coeli / Roots), 7th House (Descendant / Partner), and 10th House (Midheaven / Legacy). They anchor the cardinal cross of the chart to initiate major life events and physical reality structures.",
        "hint": "The Four Cardinal Pillars"
      },
      {
        "q": "Conjunction Aspect — Angle, Orb & Effect",
        "a": "• Angle: 0° (Orb: 0°–10°)\n• Keyword: Synthesis & Fusion\n• Psychological Effect: Blends planetary energies into one intense, concentrated powerhouse drive, creating tremendous momentum but requiring conscious objectivity.",
        "hint": "0° Conjunction"
      },
      {
        "q": "Sextile Aspect — Angle, Orb & Effect",
        "a": "• Angle: 60° (Orb: 6°–8°)\n• Keyword: Opportunity & Collaboration\n• Psychological Effect: Offers gentle, collaborative potential and quiet strengths between complementary elements; requires conscious effort and choice to activate.",
        "hint": "60° Sextile"
      },
      {
        "q": "Square Aspect — Angle, Orb & Effect",
        "a": "• Angle: 90° (Orb: 6°–8°)\n• Keyword: Catalyst & Breakthrough Friction\n• Psychological Effect: Produces sharp internal clash, tension, and pressure; forces mature problem-solving, resilience, and growth through direct action.",
        "hint": "90° Square"
      },
      {
        "q": "Trine Aspect — Angle, Orb & Effect",
        "a": "• Angle: 120° (Orb: 6°–8°)\n• Keyword: Harmony & Natural Flow\n• Psychological Effect: Facilitates effortless, natural energy flow and innate genius within the same element; gifts come easily, but carries a risk of complacency without discipline.",
        "hint": "120° Trine"
      },
      {
        "q": "Opposition Aspect — Angle, Orb & Effect",
        "a": "• Angle: 180° (Orb: 6°–8°)\n• Keyword: Integration & Polarity\n• Psychological Effect: Creates a pulling tension between opposing zodiac polarities; challenges the individual to find the sacred middle ground rather than projecting the shadow onto partners.",
        "hint": "180° Opposition"
      },
      {
        "q": "Quincunx (Inconjunct) Aspect — Angle & Psychological Effect",
        "a": "• Angle: 150° (Orb: 2°–3°)\n• Keyword: Recalibration & Adjustment\n• Psychological Effect: Represents awkward, mismatched energy dynamics between signs that share no element or modality; requires continuous micro-adjustments and conscious flexibility.",
        "hint": "150° Quincunx"
      },
      {
        "q": "How do major planetary aspects differ in how they catalyze personal growth?",
        "a": "Harmonious aspects (trines, sextiles) create flowing opportunity channels that reveal innate gifts and ease. Dynamic aspects (squares, oppositions) create friction, hunger, and internal tension that force active problem-solving and produce the greatest human achievements.",
        "hint": "Harmonious vs. Dynamic Growth Engines"
      },
      {
        "q": "Corrective Strategy for a Challenging Mars-Saturn Square",
        "a": "When Mars (impatience/drive) clashes with Saturn (limits/doubt), frustration boils over into self-criticism.\n• Corrective Strategy: Practice structured patience and consistent daily micro-habits. Eliminate self-doubt by showing up for the daily reps. Understand that delay is not denial—it is the building of mastery.",
        "hint": "Mars-Saturn Square Mastery"
      },
      {
        "q": "Corrective Strategy for a Challenging Moon-Pluto Opposition",
        "a": "When the Moon (emotional safety) opposes Pluto (control/fear of betrayal), intense emotional reactivity and paranoia can arise.\n• Corrective Strategy: Cultivate emotional self-awareness and non-attached observation. Step into the role of the neutral witness. Name your fear of abandonment without manipulating or projecting it onto others.",
        "hint": "Moon-Pluto Emotional Sovereignty"
      },
      {
        "q": "Corrective Strategy for a Challenging Jupiter-Saturn Quincunx",
        "a": "When Jupiter (grandiose expansion) clashes awkwardly with Saturn (strict reality), you oscillate between wild over-optimism and depressing burnout.\n• Corrective Strategy: Seek grounded mentorship and make practical, incremental adjustments. Break grandiose 5-year visions into practical 90-day actionable milestones.",
        "hint": "Jupiter-Saturn Grounded Expansion"
      },
      {
        "q": "How do the Midheaven (MC) and the North Node interact to guide career and life purpose?",
        "a": "The Midheaven (MC) defines your external career path, public persona, authority, and professional reputation. The North Node represents your soul's internal compass, karmic evolution, and spiritual growth edge. Aligning both integrates professional ambition with your highest soul calling.",
        "hint": "Midheaven vs. North Node Synergy"
      },
      {
        "q": "Which astrological houses form the core 'Vocational Blueprint' for career and wealth?",
        "a": "1. 2nd House: Personal Income, Tangible Talents & Self-Worth\n2. 6th House: Daily Workflow, Craftsmanship & Health Maintenance\n3. 10th House / Midheaven: Public Calling, Leadership & Legacy\n4. Saturn: The Anchor of Mastery that turns raw potential into lifelong achievement.",
        "hint": "The 4 Pillars of the Vocational Blueprint"
      },
      {
        "q": "What role does Saturn play in an individual's career roadmap?",
        "a": "Saturn acts as the 'Anchor of Mastery.' It imparts the necessary discipline, resilience, time-tested patience, and long-range planning required to turn raw talent into recognized, lasting professional authority.",
        "hint": "Saturn as the Anchor of Mastery"
      },
      {
        "q": "In synastry analysis, what information does comparing Mercury and Venus signs provide?",
        "a": "Mercury reveals how an individual thinks, articulates thoughts, and processes conflict, while Venus reveals what makes their partner feel cherished, loved, and valued. Aligning communication to speak to the partner's Venus needs creates effortless relational intimacy.",
        "hint": "Mercury-Venus Synastry Alchemy"
      },
      {
        "q": "What does a heavy placement or stellium in the 7th House suggest regarding relationship dynamics?",
        "a": "It indicates a primary soul focus on long-term partnerships and deep one-on-one dynamics. The primary life lesson is learning not to lose one's individual identity, personal goals, or boundaries in the pursuit of romantic union.",
        "hint": "7th House Stellium Dynamics"
      },
      {
        "q": "What role does Chiron play when analyzing relationship triggers in a natal chart?",
        "a": "Chiron pinpoints the tender 'core wound' of vulnerability (e.g. Chiron in Cancer pointing to family or emotional security wounds). In partnership, understanding your Chiron illuminates where sensitivities and defensive reactions emerge, allowing empathy instead of blame.",
        "hint": "Chiron & Sacred Relational Triggers"
      },
      {
        "q": "What relationship themes are activated when an individual's North Node is placed in Libra?",
        "a": "It highlights a karmic soul lesson of evolving away from hyper-independent, defensive self-reliance (South Node in Aries) toward cultivating mutual respect, diplomatic balance, healthy compromise, and true reciprocal partnership.",
        "hint": "North Node in Libra Karmic Evolution"
      },
      {
        "q": "What is the key functional difference between New Moon and Full Moon phases for intention setting?",
        "a": "• New Moon (Dark Sky): Represents planting seeds, energetic clean slates, initiating new habits, and setting magnetic intentions.\n• Full Moon (Culmination & Light): Represents harvest, maximum illumination, celebration, and releasing outgrown habits or emotional patterns that no longer serve you.",
        "hint": "Lunar Cycle Intentional Alchemy"
      },
      {
        "q": "What four criteria define an effective personal intention?",
        "a": "1. Be Specific (clearly defined, unambiguous desires)\n2. Be Positive (focused on what you are creating, not what you fear)\n3. Be Present (framed in the present tense: 'I am' rather than 'I will')\n4. Be Patient (allowing growth to unfold in divine timing without frantic control).",
        "hint": "The 4 Criteria of Magnetic Intentions"
      },
      {
        "q": "The 12 Zodiac Strength Affirmations (Helena's Magnetic Declarations)",
        "a": "♈ Aries: 'I am brave, sovereign, and take unapologetic bold action.'\n♉ Taurus: 'I am grounded in worth, and I easily receive divine abundance.'\n♊ Gemini: 'I am clear, adaptable, and my voice creates magnetic connection.'\n♋ Cancer: 'I am emotionally sovereign, safe, and worthy of deep love.'\n♌ Leo: 'I am radiant, creative, and unapologetically shine my light.'\n♍ Virgo: 'I am devoted, grounded, and honor my practical magic.'\n♎ Libra: 'I am balanced, authentic, and create harmonic, respectful love.'\n♏ Scorpio: 'I am powerful, resilient, and transform every wound into gold.'\n♐ Sagittarius: 'I am expansive, free, and trust the wild adventure of life.'\n♑ Capricorn: 'I am disciplined, resilient, and building a lasting legacy.'\n♒ Aquarius: 'I am visionary, original, and true to my unique soul mission.'\n♓ Pisces: 'I am deeply connected to the divine, intuitive, and guided.'",
        "hint": "12 Magnetic Sign Affirmations"
      },
      {
        "q": "How does neuroscience explain the brain's mechanism of reality creation?",
        "a": "The brain acts as a biological 'prediction machine.' It does not perceive reality passively; it filters sensory data to match existing subconscious beliefs and past conditioning. Rewriting the inner belief alters the Reticular Activating System (RAS), changing what you notice, choose, and attract.",
        "hint": "The Brain as a Prediction Machine"
      },
      {
        "q": "What distinction separates goals from self-concept identity work?",
        "a": "You do not rise to the level of your goals; you fall to the level of your underlying identity and self-concept. If your subconscious believes you are unworthy or inconsistent, your actions will self-sabotage to reinforce that belief. Real manifestation requires shifting who you believe you ARE.",
        "hint": "Goals vs. Self-Concept Identity"
      },
      {
        "q": "What is the core principle of the Law of Detachment?",
        "a": "Detachment means passionately committing to your desire without tying your inner peace, happiness, or worth to the specific outcome or timeline. As the Bhagavad Gita teaches: 'Detachment is not that you own nothing; detachment is that nothing owns you.'",
        "hint": "The Sacred Law of Detachment"
      },
      {
        "q": "What developmental theme is emphasized during the Virgo New Moon?",
        "a": "Practical self-devotion, organizing your physical and digital environment, establishing grounded daily routines, prioritizing somatic nervous system wellness, and aligning daily habits with your soul's highest purpose.",
        "hint": "Virgo New Moon Integration"
      },
      {
        "q": "What astrological dynamic occurs when a Libra New Moon coincides with Venus Retrograde in Scorpio?",
        "a": "Rather than a polite, surface-level restart, it demands deep emotional truth. It forces you to address hidden power dynamics, unexpressed resentments, and relationship standards, refusing to maintain false harmony at the cost of your authentic soul integrity.",
        "hint": "Libra New Moon & Venus Retrograde in Scorpio"
      },
      {
        "q": "What structural criteria define a 14-day SMART action plan built from chart insights?",
        "a": "To ground cosmic insight into 3D reality, goals must be:\n• Specific: Clearly defined action\n• Measurable: Quantifiable milestone\n• Achievable: Realistic with current resources\n• Relevant: Directly aligned with your natal blueprint\n• Time-Bound: Anchored to a focused 14-day sprint.",
        "hint": "14-Day SMART Cosmic Action Plan"
      }
    ]
  }
];
