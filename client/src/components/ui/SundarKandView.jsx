import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const EPISODES = [
  {
    number: 1,
    icon: '🌊',
    titleEn: 'The Ocean Leap',
    titleHi: 'सागर लंघन',
    previewEn: 'Hanuman Ji stands at the peak of Mount Mahendra and takes a thunderous leap across the ocean to Lanka — overcoming three divine tests on the way.',
    narrativeEn: `At the southern tip of Bharat, on the summit of Mount Mahendra, the Vanaras have reached the edge of the known world. The ocean stretches before them, vast and terrifying — 100 yojanas wide (roughly 800 miles). Only Hanuman Ji, son of Vayu the Wind God, has the power to make this crossing. As he prepares to leap, his body swells to a mountain-like form, his eyes blaze like twin suns, and the earth itself trembles under his feet.\n\nHe roars — a sound that shakes the heavens — and leaps. As he flies through the sky, the ocean-god sends the submarine mountain Mainaka to rise from the waves and offer Hanuman a place to rest. Hanuman, in his humility, touches Mainaka and declines — he cannot rest while Ram's work remains undone.\n\nThen comes Surasa, the mother of nagas, sent by the gods to test Hanuman. She opens her mouth to swallow him. Hanuman expands his body — she expands her mouth. He grows larger — she grows vaster. Then in a flash of wisdom, he shrinks to the size of a thumb, darts into her mouth, and emerges before she can close it. Surasa, delighted by his cleverness, blesses him.\n\nFinally, Simhika — a monstrous demoness — grabs Hanuman's shadow from below, holding him in place. He recognises the trap, shrinks swiftly, enters her vast body, and tears her heart open, killing her.\n\nOverkilling no one and being stopped by none, Hanuman Ji arrives at the golden shores of Lanka — his mission intact.`,
    narrativeHi: `हनुमान जी महेन्द्र पर्वत की चोटी पर खड़े थे। उनके सामने विशाल समुद्र था — सौ योजन चौड़ा। वायुपुत्र हनुमान ने अपना विशाल रूप धारण किया और एक भयंकर गर्जना के साथ समुद्र के पार छलांग लगाई। बीच रास्ते में मैनाक पर्वत ने उन्हें विश्राम का निमंत्रण दिया, परंतु हनुमान जी ने विनम्रता से मना कर दिया — जब तक प्रभु राम का कार्य पूरा न हो, वे विश्राम नहीं करेंगे। फिर सुरसा ने उनकी परीक्षा ली — उन्होंने अपना मुख फैलाया, हनुमान जी ने अपना शरीर फैलाया, फिर अचानक अंगूठे के आकार बनकर उनके मुख में प्रवेश किया और बाहर निकल आए। सुरसा ने प्रसन्न होकर आशीर्वाद दिया। इसके बाद सिंहिका राक्षसी ने उनकी छाया पकड़ी, किन्तु हनुमान जी ने उसे भी परास्त कर दिया। इस प्रकार तीनों परीक्षाओं में उत्तीर्ण होकर हनुमान जी लंका के सुनहरे तट पर पहुँचे।`,
    shlokaDevanagari: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥',
    shlokaTranslit: 'manojavaṃ mārutatulyavegaṃ jitendriyaṃ buddhimatāṃ variṣṭham |\nvātātmajaṃ vānarayūthamukhyaṃ śrīrāmadūtaṃ śaraṇaṃ prapadye ||',
    shlokaMeaning: 'I take refuge in the messenger of Sri Ram — Hanuman — who is swift as the mind, whose speed equals the Wind God, who has conquered the senses, who is the foremost among the wise, who is the son of the Wind, and the chief of the Vanara army.',
    shlokaWordMeaning: [
      { word: 'मनोजवं', meaning: 'swift as the mind' },
      { word: 'मारुततुल्यवेगं', meaning: 'speed equal to the wind (maruta)' },
      { word: 'जितेन्द्रियं', meaning: 'one who has conquered the senses' },
      { word: 'बुद्धिमतां वरिष्ठम्', meaning: 'the greatest among the wise' },
      { word: 'वातात्मजं', meaning: 'son of Vata (Wind God)' },
      { word: 'वानरयूथमुख्यं', meaning: 'chief of the Vanara army' },
      { word: 'श्रीरामदूतं', meaning: 'messenger of Sri Ram' },
      { word: 'शरणं प्रपद्ये', meaning: 'I take refuge / surrender' },
    ],
  },
  {
    number: 2,
    icon: '🏰',
    titleEn: 'Lanka at Night',
    titleHi: 'लंका दर्शन',
    previewEn: 'Hanuman arrives in golden Lanka, slips past the guardian demoness Lankini, and searches palace after palace through the night for Sita Mata.',
    narrativeEn: `Lanka glittered like a second sun on the ocean — its walls of solid gold, its towers laced with gems, its streets lit by a thousand lamps. Even Hanuman Ji, the great warrior, paused in awe. No enemy could breach these walls. The city was built by Vishwakarma, the divine architect, and guarded by demons of immeasurable power.\n\nAt the northern gate stood Lankini — the city's guardian demoness, vast and terrifying, clothed in the night sky. When she saw Hanuman, she struck him with her fist. Hanuman barely tapped her back with his left fist — and she fell, spitting blood. Humbled, she told him: "A monkey will one day be Lanka's destroyer — Brahma warned me long ago. Enter, son of the Wind." Her defeat signalled the beginning of Lanka's end.\n\nHanuman shrank to a small form and slipped inside. All night long he searched — every street, every palace, every chamber. He found Ravana in his inner sanctum, asleep amid his queens, surrounded by wine and riches. He saw Ravana's wives, his concubines, his vast demon court — but Sita was not among them. The wives he saw were taken by force; Sita, a willing devotee of Ram, would not be with them.\n\nRoom after room, hall after hall, tower after tower — and still no sign of Sita Mata. Hanuman's heart sank. Had he come so far for nothing? But he would not give up. He had not yet searched every corner of this golden prison.`,
    narrativeHi: `लंका देखकर हनुमान जी भी चकित रह गए — सुवर्ण की दीवारें, रत्नजड़ित शिखर, हज़ारों दीपकों से प्रकाशित नगरी। उत्तर द्वार पर लंकिनी राक्षसी खड़ी थी। उसने हनुमान जी को मुक्का मारा, हनुमान जी ने हल्के से पलटवार किया — और लंकिनी गिर पड़ी। तब उसे ब्रह्मा जी की भविष्यवाणी याद आई: "जिस दिन कोई वानर तुम्हें पराजित करे, समझो लंका का नाश निकट है।" लंकिनी ने हनुमान जी को प्रवेश दिया। हनुमान जी ने रात भर सारे महल छान मारे — रावण के भीतरी महल से लेकर सेवकों के आवास तक। रावण को अपनी रानियों के साथ देखा, किन्तु सीता माँ कहीं नहीं मिलीं। हनुमान जी का मन उद्विग्न हुआ, परंतु उन्होंने हार नहीं मानी।`,
    shlokaDevanagari: 'अद्भुतां रमणीयां च लङ्कां विश्वकर्मणा कृताम् ।\nददर्श हनुमान्श्रेष्ठस्तामनेककृतालयाम् ॥',
    shlokaTranslit: 'adbhutāṃ ramaṇīyāṃ ca laṅkāṃ viśvakarmaṇā kṛtām |\ndadarśa hanumānśreṣṭhastāmanekakṛtālayām ||',
    shlokaMeaning: 'Hanuman, the greatest of Vanaras, beheld Lanka — that wondrous, beautiful city built by Vishwakarma (the divine architect), filled with countless glorious mansions.',
    shlokaWordMeaning: [
      { word: 'अद्भुतां', meaning: 'wondrous, astonishing' },
      { word: 'रमणीयां', meaning: 'beautiful, delightful' },
      { word: 'लङ्कां', meaning: 'Lanka (the city)' },
      { word: 'विश्वकर्मणा कृताम्', meaning: 'built by Vishwakarma (divine architect)' },
      { word: 'ददर्श', meaning: 'beheld, saw' },
      { word: 'हनुमान्श्रेष्ठ', meaning: 'Hanuman, the foremost/greatest' },
      { word: 'अनेककृतालयाम्', meaning: 'having countless mansions' },
    ],
  },
  {
    number: 3,
    icon: '🙏',
    titleEn: 'Meeting Vibhishana',
    titleHi: 'विभीषण मिलन',
    previewEn: 'In the heart of demon-Lanka, Hanuman finds Vibhishana — Ravana\'s own brother — seated alone and chanting Ram\'s name. He reveals Sita\'s location.',
    narrativeEn: `As Hanuman Ji searched in the darkness, he heard something extraordinary — the name of Ram. In the kingdom of Ravana, the name of Ram. He followed the sound and found Vibhishana — Ravana's youngest brother — seated on a mat of kusha grass, clad in white, eyes closed, his lips moving in Ram's name. His home was simple, decorated with Ram's symbols, untouched by the demon luxury that surrounded it.\n\nVibhishana sensed Hanuman and opened his eyes. Neither was afraid. Vibhishana asked — "Who are you, monkey, dressed in the colour of the sun, seated like a sage? What brings you to Lanka?" Hanuman, moved by the devotion he had witnessed, revealed himself as Ram's messenger.\n\nVibhishana's eyes filled with tears. He told Hanuman everything — that Sita Mata was in the Ashok Vatika (the grove of trees to the south-east), guarded by demonesses. She had been offered all of Ravana's wealth and power but had refused everything. She thought only of Ram. She had given herself two months to live.\n\nThis meeting is one of the most emotionally powerful moments of the Sundar Kand — it proves that even in the darkest kingdoms, Ram's devotees exist. Even in Lanka, Ram's grace had kept a lamp burning — and that lamp was Vibhishana.\n\nVibhishana told Hanuman: "Give Sita Mata my respects. Tell her that I pray for her liberation every day." Hanuman bowed to this righteous demon and made his way to the Ashok Vatika.`,
    narrativeHi: `अंधेरे में भटकते हनुमान जी को अचानक राम नाम सुनाई दिया। यह स्वर रावण की लंका में था — यह असंभव लगता था, पर था। वे उस दिशा में गए और पाया विभीषण को — रावण के अनुज — जो कुश के आसन पर श्वेत वस्त्र धारण किए, राम नाम का जप कर रहे थे। उनका घर सरल था, राम के चिह्नों से सुशोभित। विभीषण ने हनुमान जी को देखा और बिना भय के पूछा — "वानर, तुम कौन हो?" हनुमान जी ने स्वयं को राम का दूत बताया। विभीषण की आँखें भर आईं। उन्होंने बताया — सीता माँ अशोक वाटिका में हैं, राक्षसियों से घिरी हुई, दो महीने की अवधि उन्होंने स्वयं को दी है। विभीषण ने सीता माँ के लिए अपनी प्रार्थनाएं भेजीं। यह मिलन इस बात का प्रमाण है कि राम की भक्ति किसी देश, जाति या कुल की सीमा नहीं मानती।`,
    shlokaDevanagari: 'रामस्य दूतमागत्य विभीषणमुपस्थितम् ।\nदृष्ट्वा तं हनुमान्प्रीतो बभूव कपिसत्तमः ॥',
    shlokaTranslit: 'rāmasya dūtamāgatya vibhīṣaṇamupasthitam |\ndṛṣṭvā taṃ hanumānprīto babhūva kapisattamaḥ ||',
    shlokaMeaning: 'Seeing Vibhishana standing before him — who had come as Ram\'s devotee — Hanuman, the foremost of Vanaras, was filled with great joy.',
    shlokaWordMeaning: [
      { word: 'रामस्य दूतम्', meaning: 'messenger of Ram' },
      { word: 'आगत्य', meaning: 'having come' },
      { word: 'विभीषणम्', meaning: 'Vibhishana' },
      { word: 'उपस्थितम्', meaning: 'standing present' },
      { word: 'दृष्ट्वा', meaning: 'having seen' },
      { word: 'प्रीतः', meaning: 'filled with joy, pleased' },
      { word: 'कपिसत्तमः', meaning: 'the foremost among Vanaras' },
    ],
  },
  {
    number: 4,
    icon: '🌺',
    titleEn: 'Sita in Ashok Vatika',
    titleHi: 'अशोक वाटिका में सीता माँ',
    previewEn: 'Hanuman finds Sita Mata in the grove — emaciated, surrounded by demonesses, yet radiating an unbreakable devotion to Ram like a lamp burning in the wind.',
    narrativeEn: `The Ashok Vatika was a garden of unearthly beauty — every tree in perpetual bloom, every flower perfumed, every path paved with gold. But at its centre, under the shimshupa tree, sat Sita Mata — and the contrast tore Hanuman's heart open.\n\nShe was dressed in a single worn garment — the same she had worn since her abduction. She was thin, her face pale, her eyes swollen from months of weeping. Yet her beauty shone like a lamp flame in the wind — unextinguished by grief, unconquered by captivity. Around her sat demonesses — some sleeping, some keeping watch — weapons nearby. The atmosphere was one of dread and oppression.\n\nRavana came to her that very night — Hanuman watched from his tree above. Ravana, in all his ten-headed, twenty-armed glory, begged and threatened and promised. He offered her all of Lanka, queenship over all his wives, riches beyond imagination. Sita Mata placed a blade of grass between herself and Ravana and spoke: "I will not even look at you directly. I am the wife of Ram — the greatest man who ever lived. You cannot win me with wealth or fear. You have two months to return me, or meet your end."\n\nHanuman, watching all this, was overwhelmed with emotion. He saw the depth of her devotion — not a tremor, not a moment of doubt, not a second of considering Ravana's offers. She was thinking only of Ram. He decided: he would reveal himself carefully, gently, after Ravana left.`,
    narrativeHi: `अशोक वाटिका अलौकिक सुंदरता से भरी थी, किन्तु उसके मध्य में शिंशपा वृक्ष के नीचे सीता माँ बैठी थीं — मलिन वस्त्रों में, क्षीण काया, शोक से व्याकुल नेत्र। फिर भी उनकी आभा ऐसी थी जैसे वायु में जलता दीपक — शांत, अटल, अविजित। राक्षसियाँ उन्हें घेरे थीं। रावण वहाँ आया और सब कुछ देने की बात कही — रानीपद, धन, सत्ता। सीता माँ ने एक तिनका अपने और रावण के बीच रखा और कहा: "मैं श्रीराम की पत्नी हूँ। तुम्हारे पास दो महीने का समय है। या तो मुझे लौटा दो, या अपना विनाश देखो।" हनुमान जी पेड़ पर बैठे यह सब देखते रहे और उनकी आँखें भर आईं। माँ की राम के प्रति अटूट भक्ति देखकर उनका हृदय गद्गद हो गया।`,
    shlokaDevanagari: 'निमिष निमिष करुनानिधि जाहीं ।\nपाई सुमति यह चाहत नाहीं ॥',
    shlokaTranslit: 'nimiṣa nimiṣa karunānidhi jāhīṃ |\npāī sumati yaha cāhata nāhīṃ ॥',
    shlokaMeaning: 'The ocean of compassion (Ram) passes away moment by moment — having received good wisdom, she does not wish (to be separated any longer). A verse from Ramcharitmanas expressing Sita\'s anguish — every passing moment without Ram is an age of suffering.',
    shlokaWordMeaning: [
      { word: 'निमिष निमिष', meaning: 'moment by moment, instant by instant' },
      { word: 'करुनानिधि', meaning: 'ocean of compassion (Ram)' },
      { word: 'जाहीं', meaning: 'passes away, goes' },
      { word: 'पाई सुमति', meaning: 'having received good wisdom/sense' },
      { word: 'चाहत नाहीं', meaning: 'does not want (this separation)' },
    ],
  },
  {
    number: 5,
    icon: '💍',
    titleEn: 'Hanuman Reveals Himself to Sita',
    titleHi: 'हनुमान-सीता मिलन',
    previewEn: 'Ram\'s ring drops from the tree. Sita looks up. Hanuman descends. The most emotional meeting of the Ramayana — and Sita\'s message for Ram.',
    narrativeEn: `After Ravana left in frustrated rage, Hanuman Ji began reciting the story of Ram — softly at first, from his branch above. Sita Mata heard it and looked up, startled. A monkey was sitting in the tree — but his eyes were filled with devotion, his face serene, his form otherworldly. He dropped Ram's ring into her lap.\n\nSita stared at the ring — Ram's personal seal, his identity. Her hands trembled. Could this be real? Could it be a demon's trick? Hanuman descended and prostrated before her. He said — "I am Hanuman, the son of Vayu, the devoted servant of Ram. Ram sent me to find you."\n\nSita wept — not from grief now, but from relief. She asked about Ram, about Lakshman, about the Vanaras. Hanuman described Ram's condition: he had not eaten, not slept properly, consumed entirely by longing for her. Sita's tears flowed faster.\n\nShe gave Hanuman the Chudamani — her jewelled hairpin — the one Ram had fastened in her hair on the day of their wedding. "Take this to Ram," she said. "He will know it is mine. And tell him this — I have given myself two more months. If he does not come by then, there will be nothing left to save."\n\nHanuman offered to carry her on his back immediately — across the ocean. Sita refused gently: "Ram must come himself. The glory of rescuing me must be his. It would not be right for me to be carried away by anyone other than Ram." This was Sita Mata's profound wisdom — even in her darkest hour, she thought of Ram's honour, not just her own liberation.\n\nHanuman bowed to her feet and prepared to leave.`,
    narrativeHi: `हनुमान जी पेड़ से राम कथा सुनाने लगे। सीता माँ ने ऊपर देखा। हनुमान जी ने राम की अँगूठी नीचे गिराई। सीता माँ के हाथ काँप उठे — यह राम की निशानी थी। हनुमान जी नीचे उतरे, उनके चरणों में प्रणाम किया और बोले, "माँ, मैं हनुमान हूँ, राम का दूत।" सीता माँ की आँखों से आँसू बह निकले — पीड़ा के नहीं, राहत के। उन्होंने राम के बारे में सब पूछा। हनुमान जी ने बताया कि राम उनके बिना जी नहीं पा रहे। सीता माँ ने चूड़ामणि दी — अपने विवाह के समय की निशानी — और कहा, "राम को बताना, दो महीने और हैं। उनसे कहना, जल्दी आएं।" हनुमान जी ने उन्हें अपनी पीठ पर ले जाने की पेशकश की। सीता माँ ने मना किया — "राम को स्वयं आकर मुझे छुड़ाना है। उनकी विजय उनकी होनी चाहिए।" यह सीता माँ का महान् बलिदान था।`,
    shlokaDevanagari: 'यो वा स नरशार्दूलो ददौ मे विपुलं यशः ।\nस एव मे भवेद्भर्ता वरदो धर्मवत्सलः ॥',
    shlokaTranslit: 'yo vā sa naraśārdūlo dadau me vipulaṃ yaśaḥ |\nsa eva me bhaved bhartā varado dharmavatsalaḥ ||',
    shlokaMeaning: 'He who is that tiger among men who gave me great glory — he alone is my husband, the boon-giver, the lover of righteousness. Sita affirms to Hanuman that none but Ram is her Lord.',
    shlokaWordMeaning: [
      { word: 'नरशार्दूलः', meaning: 'tiger among men' },
      { word: 'ददौ', meaning: 'gave' },
      { word: 'विपुलं यशः', meaning: 'great glory/fame' },
      { word: 'मे भर्ता', meaning: 'my husband' },
      { word: 'वरदः', meaning: 'one who grants boons' },
      { word: 'धर्मवत्सलः', meaning: 'lover / devoted to dharma' },
    ],
  },
  {
    number: 6,
    icon: '⛓️',
    titleEn: 'Hanuman Captured',
    titleHi: 'बंदी हनुमान',
    previewEn: 'Hanuman devastates the Ashok Vatika, defeats demon armies, then allows himself to be captured by Meghnad — purely out of curiosity to see Ravana face to face.',
    narrativeEn: `After meeting Sita Mata, Hanuman did not leave immediately. He decided — if he was already in Lanka, why not demonstrate to Ravana exactly what kind of messenger Ram had sent? He began to eat the fruits of the Ashok Vatika — slowly at first, then with growing abandon. He broke branches. He uprooted trees. He crushed the flower gardens. The garden that Ravana had tended with pride was being systematically destroyed.\n\nThe demon guards rushed in. Hanuman killed them. Ravana sent more — his most elite warriors, the Kinkaras. Hanuman killed them all. Then he destroyed the great gate of the Vatika. Ravana, enraged, sent his own sons — Jambumali and others. Hanuman killed them too.\n\nMeghnad — Indrajit, the conqueror of Indra, Ravana's most powerful son — came next with Brahmastra. Now, Brahmastra cannot be ignored; it is the weapon of Brahma the Creator himself. Out of reverence for Brahma — NOT because he could not escape — Hanuman allowed himself to be bound. He was brought through the streets of Lanka in chains, crowds of demons staring at the miraculous monkey who had single-handedly destroyed their army.\n\nBefore Ravana's court, Hanuman sat — not as a prisoner, not in fear, but with the calm dignity of Ram's ambassador. He introduced himself: "I am Hanuman. I am the servant of Ram, the rightful King of Ayodhya, the protector of dharma, the slayer of 14,000 demons. I come with a message: Return Sita Mata and beg Ram's forgiveness, or face annihilation." The entire court went silent.`,
    narrativeHi: `सीता माँ से मिलकर हनुमान जी ने सोचा — लंका में आए हैं तो रावण को राम के दूत की शक्ति का एहसास कराना चाहिए। उन्होंने अशोक वाटिका उजाड़ना शुरू किया। राक्षस सेना आई — हनुमान जी ने उन्हें परास्त किया। रावण के पुत्र आए — हनुमान जी ने उन्हें भी मारा। अंत में मेघनाद ब्रह्मास्त्र लेकर आया। ब्रह्मा के अस्त्र का आदर करते हुए हनुमान जी ने स्वयं को बंधने दिया — इसलिए नहीं कि वे बंध सकते थे, बल्कि इसलिए कि वे रावण से मिलना चाहते थे। रावण की सभा में लाए गए हनुमान जी ने निर्भीकता से कहा: "मैं राम का दूत हूँ। सीता माँ को लौटा दो और क्षमा माँगो, नहीं तो लंका का विनाश निश्चित है।" पूरी सभा स्तब्ध रह गई।`,
    shlokaDevanagari: 'न मे बध्नन्ति ते पाशा न मे दहति पावकः ।\nन हि भूयो भविष्यन्ति पाशा ये रामदूतके ॥',
    shlokaTranslit: 'na me badhnanti te pāśā na me dahati pāvakaḥ |\nna hi bhūyo bhaviṣyanti pāśā ye rāmadūtake ||',
    shlokaMeaning: 'These bonds cannot bind me; fire cannot burn me. No bonds can ever hold one who is Ram\'s messenger. Hanuman\'s declaration of his divine protection as Ram\'s devotee.',
    shlokaWordMeaning: [
      { word: 'न मे बध्नन्ति', meaning: 'do not bind me' },
      { word: 'पाशा', meaning: 'ropes, bonds, chains' },
      { word: 'न दहति', meaning: 'do not burn' },
      { word: 'पावकः', meaning: 'fire (Agni)' },
      { word: 'रामदूतके', meaning: 'Ram\'s messenger' },
    ],
  },
  {
    number: 7,
    icon: '🔥',
    titleEn: 'Lanka Burns',
    titleHi: 'लंका दहन',
    previewEn: 'Ravana orders Hanuman\'s tail lit on fire. By Sita\'s grace, the flames do not burn him. He grows his tail endlessly and leaps from palace to palace, burning golden Lanka.',
    narrativeEn: `Ravana, unable to kill Ram's messenger (it would be a grave sin to kill an ambassador), ordered instead that Hanuman's tail be set on fire. The demons wrapped oil-soaked cloth around his tail — more and more cloth, making it longer and longer. Hanuman simply made his tail longer than all their cloth. Finally they lit it.\n\nBut the fire did not burn. Sita Mata, watching from her Ashok Vatika, prayed to Agni — the Fire God: "If I have been faithful to Ram in thought, word, and deed — do not burn Hanuman." And Agni obeyed. The fire blazed brilliantly but produced no heat for Hanuman.\n\nHanuman, his tail a torch of divine fire, broke free of his bonds in an instant. He leapt from the ground — and began Lanka's destruction. Palace after palace, tower after tower — the golden Lanka burned. His tail was the instrument, his joy was boundless. Every magnificent structure that Ravana had built with demon-power and stolen wealth began to collapse in golden flames.\n\nThe demons scattered, screaming. Ravana's queens wept. The entire city was in chaos — smoke rising to the heavens, the golden towers collapsing, the streets full of running demons. Hanuman saw to it that Vibhishana's home was spared, and that the Ashok Vatika — where Sita Mata sat — remained untouched. Only the wicked burned; the righteous were protected.\n\nWhen Lanka had been sufficiently destroyed, Hanuman extinguished his tail in the ocean and returned to check on Sita Mata — to ensure she was safe amid the chaos. She was. He bowed to her one last time and leapt northward, back toward Bharat.`,
    narrativeHi: `रावण ने आदेश दिया — हनुमान जी की पूँछ में आग लगाओ। राक्षसों ने तेल में भीगे कपड़े पूँछ पर लपेटे — हनुमान जी पूँछ और लंबी करते गए। अंततः आग लगाई। पर आग जली नहीं। सीता माँ ने अग्निदेव से प्रार्थना की — "यदि मैं राम की सच्ची भक्त हूँ, तो हनुमान को मत जलाना।" अग्निदेव ने माना। हनुमान जी ने बंधन तोड़े और लंका दहन आरंभ किया। एक-एक महल जलाया, एक-एक शिखर तोड़ा। विभीषण का घर और अशोक वाटिका अछूती रही। सोने की लंका धुएँ में घिर गई, रावण की पत्नियाँ रोईं, राक्षस भागे। जब पर्याप्त हो गया, हनुमान जी ने पूँछ समुद्र में बुझाई, सीता माँ का अंतिम प्रणाम किया और उत्तर दिशा में छलांग लगाई।`,
    shlokaDevanagari: 'ततः पुच्छे कृतां वह्निं ववृधे मारुतात्मजः ।\nप्रदीप्तां लङ्कां दृष्ट्वा च ननन्द कपिसत्तमः ॥',
    shlokaTranslit: 'tataḥ pucche kṛtāṃ vahniṃ vavṛdhe mārutātmajaḥ |\npradīptāṃ laṅkāṃ dṛṣṭvā ca nananda kapisattamaḥ ||',
    shlokaMeaning: 'Then Hanuman (son of the Wind) grew with the fire set on his tail. Seeing Lanka blazing and illuminated, the foremost of the Vanaras rejoiced.',
    shlokaWordMeaning: [
      { word: 'पुच्छे', meaning: 'on the tail' },
      { word: 'कृतां वह्निम्', meaning: 'fire that was set/placed' },
      { word: 'वावृधे', meaning: 'grew, expanded' },
      { word: 'मारुतात्मजः', meaning: 'son of Maruta (Wind God) — Hanuman' },
      { word: 'प्रदीप्तां लङ्काम्', meaning: 'Lanka blazing/illuminated' },
      { word: 'ननन्द', meaning: 'rejoiced, was delighted' },
      { word: 'कपिसत्तमः', meaning: 'foremost of the Vanaras' },
    ],
  },
  {
    number: 8,
    icon: '🌅',
    titleEn: 'Return to Ram',
    titleHi: 'राम के पास लौटे',
    previewEn: 'Hanuman returns across the ocean, gives Ram the joyful news — Sita is alive. Ram embraces him weeping. And declares: no gift could equal what Hanuman has done.',
    narrativeEn: `Hanuman Ji crossed the ocean again, landed at the Mahendra shore, and the waiting Vanaras erupted in celebration — they had seen the smoke from Lanka, they had guessed the magnitude of what he had done. They showered him with flowers and praises. He told them briefly — Sita Mata is alive, Lanka has been shown Ram's power — and then the entire army ran northward to meet Ram.\n\nRam and Lakshman were waiting at the encampment with Sugriva. When they saw the Vanara army returning in jubilation, Ram's heart leapt — only good news travels with this kind of joy. Then Hanuman Ji came and stood before Ram.\n\nHanuman prostrated at Ram's feet and handed him the Chudamani — Sita's hairpin jewel. Ram took it in both hands and held it to his chest. His eyes filled with tears — not of sorrow, but of recognition. He pressed it to his heart and wept openly, the great King of Ayodhya weeping like a devoted husband. "This belonged to her father's house," Ram whispered, "given to her on our wedding day."\n\nRam looked at Hanuman and said words that are among the most beloved in all of Sanskrit literature: "What gift can I give you, Hanuman? My kingdom is nothing compared to what you have done. My treasury is nothing. My gratitude cannot be expressed in words. You found the impossible. You are the one person in all three worlds who is worthy to be called my own."\n\nHe embraced Hanuman — the Lord of the Universe embracing his most beloved servant — and the entire Vanara army and the seven sages in heaven wept with joy.\n\nThe Sundar Kand ends here — with the messenger's return. And with that return, the path to Lanka's destruction and Sita's liberation was clear. The war would come. The victory was certain.`,
    narrativeHi: `हनुमान जी ने समुद्र पार किया और महेन्द्र तट पर वानरों ने उनका जयकारा किया। सबने लंका से उठता धुआँ देखा था। हनुमान जी राम के पास पहुँचे और उनके चरणों में प्रणाम किया। चूड़ामणि आगे बढ़ाई। राम ने उसे दोनों हाथों से थाम लिया और छाती से लगा लिया — आँखें भर आईं। वे फूट-फूटकर रोए। फिर राम ने हनुमान जी को देखा और कहा: "हनुमान, मैं तुम्हें क्या दूँ? मेरा राज्य, मेरा खजाना — कुछ भी तुम्हारी सेवा के बराबर नहीं। तुमने असंभव को संभव किया। तुम मेरे सबसे प्रिय हो।" राम ने हनुमान जी को अपनी बाँहों में भर लिया। आकाश में देव-मुनि प्रसन्न हुए, वानर सेना ने हर्षनाद किया। सुंदर काण्ड यहीं समाप्त होता है — दूत की वापसी के साथ, और विजय की निश्चितता के साथ।`,
    shlokaDevanagari: 'यत्र यत्र रघुनाथकीर्तनं तत्र तत्र कृतमस्तकाञ्जलिम् ।\nबाष्पवारिपरिपूर्णलोचनं मारुतिं नमत राक्षसान्तकम् ॥',
    shlokaTranslit: 'yatra yatra raghunāthakīrtanaṃ tatra tatra kṛtamastakāñjalim |\nbāṣpavāriparipūrṇalocanaṃ mārutiṃ namata rākṣasāntakam ||',
    shlokaMeaning: 'Wherever the glory of Raghunath (Ram) is sung, there Hanuman stands with folded hands above his head, his eyes brimming with tears of devotion. I salute that Maruti, the destroyer of demons.',
    shlokaWordMeaning: [
      { word: 'यत्र यत्र', meaning: 'wherever' },
      { word: 'रघुनाथकीर्तनम्', meaning: 'the glory/praise of Raghunath (Ram)' },
      { word: 'तत्र तत्र', meaning: 'there, in that very place' },
      { word: 'कृतमस्तकाञ्जलिम्', meaning: 'with folded hands above the head' },
      { word: 'बाष्पवारिपरिपूर्णलोचनम्', meaning: 'eyes filled with tears of devotion' },
      { word: 'मारुतिम्', meaning: 'son of Maruta — Hanuman' },
      { word: 'राक्षसान्तकम्', meaning: 'destroyer of the demons' },
    ],
  },
]

const BENEFITS = [
  { icon: '🛡️', en: 'Removes all obstacles from life\'s path', hi: 'जीवन के सभी विघ्न दूर होते हैं' },
  { icon: '🕊️', en: 'Brings deep inner peace and mental calm', hi: 'मन को गहरी शांति और स्थिरता मिलती है' },
  { icon: '✨', en: 'Fulfills sincere wishes and desires', hi: 'सच्ची मनोकामनाएं पूर्ण होती हैं' },
  { icon: '🔰', en: 'Protects from negative energies and evil eye', hi: 'नकारात्मक शक्तियों और बुरी नज़र से रक्षा होती है' },
  { icon: '💪', en: 'Grants courage, confidence and strength', hi: 'साहस, आत्मविश्वास और बल की प्राप्ति होती है' },
  { icon: '🌟', en: 'Brings Hanuman Ji\'s special grace and presence', hi: 'हनुमान जी की विशेष कृपा और उपस्थिति का अनुभव होता है' },
]

export default function SundarKandView() {
  const { language, goBack } = useTempleStore()
  const t = (en, hi) => language === 'hi' ? hi : en
  const [expandedEpisode, setExpandedEpisode] = useState(null)
  const [expandedWord, setExpandedWord] = useState(null)

  const toggleEpisode = (num) => setExpandedEpisode(prev => prev === num ? null : num)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 10%, #1a0520 0%, #0a0515 60%)',
        overflowY: 'auto',
      }}
    >
      {/* Sticky Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(10,5,21,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,193,7,0.15)',
        padding: '0.85rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={goBack}
          style={{
            background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)',
            borderRadius: '8px', color: '#c9a96e', fontFamily: 'Cinzel, serif',
            fontSize: '0.8rem', padding: '0.4rem 1rem', cursor: 'pointer', letterSpacing: '0.08em',
          }}
        >← {t('Back', 'वापस')}</motion.button>
        <span style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', color: '#ffc107', letterSpacing: '0.12em',
        }}>
          {t('SUNDAR KAND', 'सुंदर काण्ड')}
        </span>
        <div style={{ fontSize: '1.3rem' }}>🌊</div>
      </div>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem' }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ textAlign: 'center', padding: '1.5rem 1rem 2rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.25))' }} />
            <span style={{ color: 'rgba(255,193,7,0.4)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.25))' }} />
          </div>
          <h1 style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#fff8e7', margin: '0 0 0.4rem', fontWeight: 400,
            textShadow: '0 2px 24px rgba(255,193,7,0.25)',
          }}>सुंदर काण्ड</h1>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.62rem',
            color: 'rgba(201,169,110,0.6)', margin: '0 0 1.25rem', letterSpacing: '0.32em',
          }}>SUNDAR KAND</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.2))' }} />
            <span style={{ color: 'rgba(255,193,7,0.35)', fontSize: '0.75rem' }}>ॐ</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.2))' }} />
          </div>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.92rem' : '0.78rem',
            color: 'rgba(201,169,110,0.55)',
            maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.9,
          }}>
            {t(
              'The most spiritually powerful chapter of the Ramayana — entirely the story of Hanuman Ji. His ocean leap, his search for Sita, and his return to Ram.',
              'रामायण का सर्वाधिक आध्यात्मिक रूप से शक्तिशाली अध्याय — पूर्णतः हनुमान जी की कथा।'
            )}
          </p>
          {/* Stats pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { label: t('68 Sargs', '68 सर्ग'), icon: '📖' },
              { label: t('4,931 Shlokas', '4,931 श्लोक'), icon: '📿' },
              { label: t('45–60 min to read', 'पढ़ने में 45–60 मिनट'), icon: '⏱️' },
            ].map((pill) => (
              <span key={pill.label} style={{
                background: 'rgba(255,193,7,0.08)',
                border: '1px solid rgba(255,193,7,0.2)',
                borderRadius: '20px', padding: '0.3rem 0.9rem',
                fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
                color: '#c9a96e', display: 'flex', alignItems: 'center', gap: '0.35rem',
              }}>
                {pill.icon} {pill.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Sacred Benefits card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(26,8,42,0.95), rgba(18,8,42,0.95))',
            border: '1px solid rgba(255,193,7,0.25)',
            borderRadius: '18px', padding: '1.5rem 1.5rem', marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🌟</span>
            <h3 style={{
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
              color: '#ffc107', margin: 0, fontSize: '0.95rem', letterSpacing: '0.1em',
            }}>
              {t('Sacred Benefits of Reading Sundar Kand', 'सुंदर काण्ड पाठ के पवित्र लाभ')}
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.6rem' }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                background: 'rgba(255,193,7,0.04)', borderRadius: '10px', padding: '0.6rem 0.75rem',
                border: '1px solid rgba(255,193,7,0.08)',
              }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>{b.icon}</span>
                <span style={{
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                  fontSize: language === 'hi' ? '0.82rem' : '0.8rem',
                  color: 'rgba(255,248,231,0.8)', lineHeight: 1.5,
                }}>
                  {t(b.en, b.hi)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reading Guide card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{
            background: 'rgba(18,8,42,0.82)',
            border: '1px solid rgba(255,193,7,0.15)',
            borderRadius: '18px', padding: '1.25rem 1.5rem', marginBottom: '2rem',
            display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>📖</span>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
              color: '#ffc107', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '0.5rem',
            }}>
              {t('READING GUIDE', 'पाठ विधि')}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
              color: 'rgba(255,248,231,0.75)', lineHeight: 1.8,
            }}>
              {t(
                '• Can be read on any day — no restriction • Saturday evening is especially auspicious • Best read after bathing in the morning or at dusk • Face east or north while reading • Light a ghee lamp before beginning • One complete reading takes 45–60 minutes',
                '• किसी भी दिन पढ़ा जा सकता है • शनिवार की संध्या विशेष शुभ है • स्नान के बाद प्रातः या संध्याकाल में पढ़ें • पूर्व या उत्तर दिशा में मुख करके बैठें • आरंभ में घी का दीपक जलाएँ • एक पूर्ण पाठ में 45–60 मिनट लगते हैं'
              )}
            </div>
          </div>
        </motion.div>

        {/* Episodes */}
        <div style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
          color: '#c9a96e', fontSize: '0.7rem', letterSpacing: '0.18em',
          marginBottom: '1rem', paddingLeft: '0.25rem',
        }}>
          {t('THE 8 EPISODES', '8 प्रसंग')}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {EPISODES.map((ep, idx) => {
            const isOpen = expandedEpisode === ep.number
            return (
              <motion.div
                key={ep.number}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                style={{
                  background: 'rgba(18,8,42,0.82)',
                  border: `1px solid ${isOpen ? 'rgba(255,193,7,0.35)' : 'rgba(255,193,7,0.15)'}`,
                  borderRadius: '18px', overflow: 'hidden',
                  transition: 'border-color 0.3s',
                }}
              >
                {/* Episode header */}
                <button
                  onClick={() => toggleEpisode(ep.number)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '1.1rem 1.25rem', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                  }}
                >
                  <div style={{
                    flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Cinzel, serif', color: '#ffc107', fontSize: '0.75rem',
                  }}>
                    {ep.number}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '1rem' }}>{ep.icon}</span>
                      <span style={{
                        fontFamily: 'Noto Sans Devanagari, serif',
                        color: '#ffc107', fontSize: '0.9rem',
                      }}>{ep.titleHi}</span>
                      <span style={{
                        fontFamily: 'Cinzel, serif',
                        color: 'rgba(201,169,110,0.6)', fontSize: '0.72rem', letterSpacing: '0.05em',
                      }}>/ {ep.titleEn}</span>
                    </div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
                      color: 'rgba(255,248,231,0.6)', margin: 0, lineHeight: 1.5,
                    }}>
                      {ep.previewEn}
                    </p>
                  </div>
                  <div style={{
                    flexShrink: 0, color: '#c9a96e', fontSize: '0.85rem',
                    transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s',
                  }}>▶</div>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 1.25rem 1.5rem',
                        borderTop: '1px solid rgba(255,193,7,0.1)',
                        paddingTop: '1.25rem',
                      }}>
                        {/* English Narrative */}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <div style={{
                            fontFamily: 'Cinzel, serif', color: '#c9a96e', fontSize: '0.65rem',
                            letterSpacing: '0.14em', marginBottom: '0.6rem',
                          }}>THE STORY</div>
                          {ep.narrativeEn.split('\n\n').map((para, pi) => (
                            <p key={pi} style={{
                              fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                              color: 'rgba(255,248,231,0.85)', lineHeight: 1.8,
                              margin: '0 0 0.75rem',
                            }}>{para}</p>
                          ))}
                        </div>

                        {/* Hindi Summary */}
                        <div style={{
                          background: 'rgba(255,193,7,0.04)',
                          border: '1px solid rgba(255,193,7,0.12)',
                          borderRadius: '12px', padding: '1rem 1.1rem', marginBottom: '1.25rem',
                        }}>
                          <div style={{
                            fontFamily: 'Cinzel, serif', color: '#c9a96e', fontSize: '0.62rem',
                            letterSpacing: '0.14em', marginBottom: '0.5rem',
                          }}>हिन्दी सारांश</div>
                          <p style={{
                            fontFamily: 'Noto Sans Devanagari, serif', fontSize: '0.9rem',
                            color: 'rgba(255,248,231,0.82)', lineHeight: 1.9, margin: 0,
                          }}>{ep.narrativeHi}</p>
                        </div>

                        {/* Shloka Box */}
                        <div style={{
                          background: 'linear-gradient(135deg, rgba(26,8,42,0.98), rgba(18,8,42,0.98))',
                          border: '1px solid rgba(255,193,7,0.35)',
                          borderRadius: '16px', padding: '1.25rem', marginBottom: '0',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '1rem' }}>📿</span>
                            <span style={{
                              fontFamily: 'Cinzel, serif', color: '#ffc107', fontSize: '0.65rem',
                              letterSpacing: '0.16em',
                            }}>KEY SHLOKA</span>
                          </div>

                          {/* Devanagari shloka */}
                          <div style={{
                            fontFamily: 'Noto Sans Devanagari, serif',
                            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                            color: '#ffc107', lineHeight: 1.9, marginBottom: '0.9rem',
                            textAlign: 'center', padding: '0.75rem',
                            background: 'rgba(255,193,7,0.05)', borderRadius: '10px',
                            borderLeft: '3px solid rgba(255,193,7,0.4)',
                          }}>
                            {ep.shlokaDevanagari.split('\n').map((line, li) => (
                              <div key={li}>{line}</div>
                            ))}
                          </div>

                          {/* Transliteration */}
                          <div style={{
                            fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
                            color: 'rgba(201,169,110,0.8)', fontStyle: 'italic',
                            lineHeight: 1.7, marginBottom: '0.75rem',
                            padding: '0 0.25rem',
                          }}>
                            {ep.shlokaTranslit}
                          </div>

                          {/* Word-by-word meanings */}
                          {ep.shlokaWordMeaning && ep.shlokaWordMeaning.length > 0 && (
                            <div style={{ marginBottom: '0.75rem' }}>
                              <div style={{
                                fontFamily: 'Cinzel, serif', color: '#c9a96e', fontSize: '0.6rem',
                                letterSpacing: '0.12em', marginBottom: '0.5rem',
                              }}>WORD-BY-WORD</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {ep.shlokaWordMeaning.map((w, wi) => (
                                  <div
                                    key={wi}
                                    onClick={() => setExpandedWord(expandedWord === `${ep.number}-${wi}` ? null : `${ep.number}-${wi}`)}
                                    style={{
                                      background: expandedWord === `${ep.number}-${wi}` ? 'rgba(255,193,7,0.15)' : 'rgba(255,193,7,0.06)',
                                      border: '1px solid rgba(255,193,7,0.2)',
                                      borderRadius: '8px', padding: '0.25rem 0.6rem',
                                      cursor: 'pointer', transition: 'background 0.2s',
                                    }}
                                  >
                                    <span style={{
                                      fontFamily: 'Noto Sans Devanagari, serif',
                                      fontSize: '0.8rem', color: '#ffc107',
                                    }}>{w.word}</span>
                                    <AnimatePresence>
                                      {expandedWord === `${ep.number}-${wi}` && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          style={{
                                            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
                                            color: 'rgba(255,248,231,0.7)', paddingTop: '0.15rem',
                                          }}
                                        >= {w.meaning}</motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Overall meaning */}
                          <div style={{
                            background: 'rgba(255,193,7,0.06)', borderRadius: '10px',
                            padding: '0.75rem', border: '1px solid rgba(255,193,7,0.12)',
                          }}>
                            <div style={{
                              fontFamily: 'Cinzel, serif', color: '#c9a96e', fontSize: '0.6rem',
                              letterSpacing: '0.12em', marginBottom: '0.35rem',
                            }}>MEANING</div>
                            <p style={{
                              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                              color: 'rgba(255,248,231,0.85)', margin: 0, lineHeight: 1.7,
                            }}>{ep.shlokaMeaning}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Footer invocation */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem 1rem' }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🙏</div>
          <div style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            color: '#c9a96e', lineHeight: 2,
          }}>
            यत्र यत्र रघुनाथ कीर्तनं<br />
            तत्र तत्र कृतमस्तकाञ्जलिम्
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
            color: 'rgba(255,248,231,0.45)', marginTop: '0.5rem',
          }}>
            Wherever Ram's glory is sung, Hanuman is present with folded hands
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
