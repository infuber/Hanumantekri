import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const TEMPLES = [
  {
    id: 1,
    nameEn: 'Hanuman Garhi',
    nameHi: 'हनुमान गढ़ी',
    locationEn: 'Ayodhya, Uttar Pradesh',
    locationHi: 'अयोध्या, उत्तर प्रदेश',
    state: 'UP',
    emoji: '🏯',
    address: 'Hanuman Garhi, Ayodhya, Uttar Pradesh 224123',
    dailyVisitors: '20,000+',
    railway: 'Ayodhya Junction (2 km)',
    airport: 'Ayodhya Airport (30 min)',
    timings: '5:00 AM – 12:00 PM • 4:00 PM – 10:00 PM',
    significance: 'Built where Hanuman Ji guarded Ram Lalla\'s court; a 76-step staircase leads to the temple.',
    significanceHi: 'जहाँ हनुमान जी ने राम लला के दरबार की रक्षा की, वहाँ निर्मित मंदिर। 76 सीढ़ियाँ चढ़कर दर्शन।',
    about: 'Hanuman Garhi is one of the most important temples in Ayodhya, believed to be built on the very spot where Hanuman Ji lived in a cave and guarded the Ram Janmabhoomi. The temple sits at the top of a hillock reached by 76 stone steps — devotees climb these steps as an act of devotion. The main idol of Hanuman Ji is magnificent, with Anjana Mata seated on the throne and Hanuman as a child on her lap. The temple faces the Ram Janmabhoomi and is one of the five panchkoshi yatra stops in Ayodhya.',
    aboutHi: 'हनुमान गढ़ी अयोध्या के सबसे महत्त्वपूर्ण मंदिरों में से एक है। यहाँ 76 पत्थर की सीढ़ियाँ चढ़कर दर्शन होते हैं। मुख्य मूर्ति में अंजना माता सिंहासन पर बैठी हैं और गोद में बालक हनुमान हैं। यह मंदिर राम जन्मभूमि की ओर मुख किए हुए है।',
    specialPuja: [
      'Mangala Aarti — 5:00 AM',
      'Shringaar Aarti — 6:00 AM',
      'Rajbhog Aarti — 12:00 PM',
      'Sandhya Aarti — 7:00 PM',
      'Shayan Aarti — 9:30 PM',
    ],
    bestTime: 'October to March. Special during Ram Navami, Hanuman Jayanti (Chaitra Purnima), and Diwali.',
    offerings: 'Red flowers (especially rose and hibiscus), sindoor, boondi laddoo, chameli oil, red cloth.',
    offeringsHi: 'लाल फूल, सिंदूर, बूंदी के लड्डू, चमेली का तेल, लाल वस्त्र।',
    stay: 'IRCTC Guest House (Ayodhya), Hotel Saket, Dharamshala near temple.',
    tips: 'The 76 steps can be tiring — carry water. Best to visit early morning for darshan before crowds build.',
    mapQuery: 'Hanuman+Garhi+Ayodhya',
  },
  {
    id: 2,
    nameEn: 'Sankat Mochan Mandir',
    nameHi: 'संकट मोचन मंदिर',
    locationEn: 'Varanasi, Uttar Pradesh',
    locationHi: 'वाराणसी, उत्तर प्रदेश',
    state: 'UP',
    emoji: '🕌',
    address: 'Sankat Mochan Rd, Durgakund, Varanasi, Uttar Pradesh 221005',
    dailyVisitors: '15,000+',
    railway: 'Varanasi Junction (6 km)',
    airport: 'Lal Bahadur Shastri Airport (22 km)',
    timings: '5:00 AM – 10:00 PM (no midday closure)',
    significance: 'Founded by Tulsidas Ji himself, who saw Hanuman Ji here while composing the Ramcharitmanas.',
    significanceHi: 'स्वयं तुलसीदास जी ने यह मंदिर स्थापित किया, जहाँ उन्हें रामचरितमानस रचते समय हनुमान जी के दर्शन हुए।',
    about: 'Sankat Mochan — the "Remover of Troubles" — is one of the most beloved temples in Varanasi, a city of thousands of temples. It was founded by Goswami Tulsidas, the great saint-poet of the 16th century, who is believed to have seen Hanuman Ji here with his own eyes while composing the Ramcharitmanas. The temple is famous for its "besan ke laddoo" prasad — these laddoos are distributed every day and are considered especially sacred. Every Tuesday evening, the temple holds classical music performances in Hanuman Ji\'s honour. The temple sits in a grove and has a serene, forest-like atmosphere.',
    aboutHi: 'संकट मोचन वाराणसी के सबसे प्रिय मंदिरों में से एक है। इसे गोस्वामी तुलसीदास जी ने स्थापित किया था, जिन्हें यहाँ रामचरितमानस रचते समय हनुमान जी के साक्षात् दर्शन हुए। बेसन के लड्डुओं का प्रसाद यहाँ की विशेषता है। प्रत्येक मंगलवार को शास्त्रीय संगीत का आयोजन होता है।',
    specialPuja: [
      'Abhishek Puja — 5:00 AM',
      'Shringaar Darshan — 6:00 AM',
      'Tuesday Music Festival — 6:00 PM',
    ],
    bestTime: 'Winter months (October–February). Tuesdays are especially crowded. Hanuman Jayanti festival is grand.',
    offerings: 'Besan ke laddoo (the temple\'s own prasad), red cloth, marigold garlands, chameli oil.',
    offeringsHi: 'बेसन के लड्डू (मंदिर का विशेष प्रसाद), लाल वस्त्र, गेंदे के फूल, चमेली का तेल।',
    stay: 'Numerous dharamshalas and hotels near Assi Ghat and Godaulia. BHU guesthouse also an option.',
    tips: 'Go on Tuesday evenings for the music. The laddoos here are famous across India — take some home.',
    mapQuery: 'Sankat+Mochan+Mandir+Varanasi',
  },
  {
    id: 3,
    nameEn: 'Salasar Balaji',
    nameHi: 'सालासर बालाजी',
    locationEn: 'Salasar, Rajasthan',
    locationHi: 'सालासर, राजस्थान',
    state: 'RJ',
    emoji: '🏜️',
    address: 'Salasar Balaji Mandir, Salasar, Churu District, Rajasthan 331506',
    dailyVisitors: '25,000+',
    railway: 'Sujangarh (25 km)',
    airport: 'Jaipur International Airport (200 km)',
    timings: '5:00 AM – 1:00 PM • 2:30 PM – 10:00 PM',
    significance: 'The only temple in the world where Hanuman Ji\'s idol has a beard and mustache — a uniquely powerful form.',
    significanceHi: 'विश्व में एकमात्र मंदिर जहाँ हनुमान जी की मूर्ति में दाढ़ी और मूंछ है — एक अत्यंत दुर्लभ और शक्तिशाली स्वरूप।',
    about: 'Salasar Balaji is one of the most visited Hindu shrines in Rajasthan, attracting over 1 crore devotees annually. The presiding deity here is Hanuman Ji with a beard and moustache — a form not seen in any other temple in the world. The idol is said to have been found in a farm field and miraculously brought to Salasar. The temple is managed by the Chhatarpur family lineage and is renowned for fulfilling wishes, especially related to marriages, business success, and recovery from illness.',
    aboutHi: 'सालासर बालाजी राजस्थान के सर्वाधिक दर्शनीय तीर्थ स्थलों में से एक है। यहाँ दाढ़ी-मूंछ वाले हनुमान जी की मूर्ति स्थापित है — जो विश्व में अनुपम है। प्रतिवर्ष एक करोड़ से अधिक भक्त यहाँ आते हैं। विवाह, व्यापार और स्वास्थ्य से जुड़ी मनोकामनाएं यहाँ पूर्ण होती हैं।',
    specialPuja: [
      'Mangala Aarti — 5:00 AM',
      'Rajbhog — 12:00 PM',
      'Sandhya Aarti — 7:30 PM',
      'Special puja on Saturdays and Tuesdays',
    ],
    bestTime: 'Navratri (October) for the grand fair. Hanuman Jayanti. Every Saturday and Tuesday throughout the year.',
    offerings: 'Coconut, sindoor, chameli oil, red cloth. Boondi laddoo is the traditional offering.',
    offeringsHi: 'नारियल, सिंदूर, चमेली का तेल, लाल वस्त्र, बूंदी के लड्डू।',
    stay: 'Dharamshalas near the temple (cheap, basic). Hotels available in Churu (25 km). Book in advance during fairs.',
    tips: 'Arrive early — queues can be 2–3 hours long on weekends. Keep children close in crowds.',
    mapQuery: 'Salasar+Balaji+Mandir+Rajasthan',
  },
  {
    id: 4,
    nameEn: 'Jakhu Temple',
    nameHi: 'जाखू मंदिर',
    locationEn: 'Shimla, Himachal Pradesh',
    locationHi: 'शिमला, हिमाचल प्रदेश',
    state: 'HP',
    emoji: '⛰️',
    address: 'Jakhu Hill, Shimla, Himachal Pradesh 171001',
    dailyVisitors: '3,000+',
    railway: 'Shimla Railway Station (2 km)',
    airport: 'Shimla Airport / Jubbarhatti (22 km)',
    timings: '5:00 AM – 12:00 PM • 3:00 PM – 8:00 PM',
    significance: 'A 108-ft Hanuman statue visible from all of Shimla; legend says Hanuman rested here while seeking the Sanjeevani herb.',
    significanceHi: '108 फुट ऊँची हनुमान प्रतिमा पूरे शिमला से दिखती है। किंवदंती है कि हनुमान जी यहाँ संजीवनी बूटी ढूंढते समय विश्राम के लिए रुके थे।',
    about: 'Jakhu Temple sits atop Jakhu Hill at 8,048 feet elevation, making it the highest point in Shimla. The temple is ancient — some historians believe it is over 5,000 years old. The main idol of Hanuman Ji here is believed to be self-manifested (swayambhu). A 108-foot-tall statue of Hanuman Ji built in recent years dominates the Shimla skyline and is visible for miles. The hill is also famous for its large population of Rhesus macaque monkeys who live near the temple. The 2-km trek to the top is steep but rewarding, with panoramic views of the Himalayan range.',
    aboutHi: 'जाखू मंदिर शिमला की सबसे ऊँची चोटी पर 8,048 फुट की ऊंचाई पर स्थित है। मंदिर 5,000 वर्ष से अधिक पुराना माना जाता है। मुख्य मूर्ति स्वयंभू (प्राकृतिक) है। 108 फुट की हनुमान प्रतिमा पूरे शिमला का आकर्षण है। 2 किमी की खड़ी चढ़ाई कठिन है, पर ऊपर से हिमालय का नज़ारा अद्भुत है।',
    specialPuja: [
      'Morning Aarti — 5:00 AM',
      'Abhishek — 6:30 AM',
      'Special puja on Tuesdays and Saturdays',
      'Hanuman Jayanti — grand celebrations',
    ],
    bestTime: 'March to June (spring/summer) and September to November (post-monsoon). Avoid winter for the trek.',
    offerings: 'Chana (chickpeas), bananas, boondi laddoo. The monkeys will try to take offerings — hold them carefully!',
    offeringsHi: 'चना, केले, बूंदी के लड्डू। बंदर प्रसाद छीन सकते हैं — सावधान रहें।',
    stay: 'All of Shimla is accessible from the temple. Numerous hotels and HPTDC properties.',
    tips: 'Ropeway available from Shimla Ridge as alternative to trekking. Beware of monkeys snatching glasses, bags, and food.',
    mapQuery: 'Jakhu+Temple+Shimla',
  },
  {
    id: 5,
    nameEn: 'Mahavir Mandir',
    nameHi: 'महावीर मंदिर',
    locationEn: 'Patna, Bihar',
    locationHi: 'पटना, बिहार',
    state: 'BR',
    emoji: '🌟',
    address: 'Near Patna Junction Railway Station, Patna, Bihar 800001',
    dailyVisitors: '50,000+',
    railway: 'Patna Junction (500 meters away)',
    airport: 'Jay Prakash Narayan Airport, Patna (8 km)',
    timings: '5:30 AM – 9:30 PM (one of the longest darshan hours in India)',
    significance: 'Over 50,000 devotees daily; 500 kg of prasad distributed every single day — one of India\'s busiest temples.',
    significanceHi: 'प्रतिदिन 50,000 से अधिक भक्त दर्शन करते हैं। 500 किलो प्रसाद वितरित होता है। भारत के सबसे व्यस्त मंदिरों में से एक।',
    about: 'Mahavir Mandir is one of the most visited temples in all of Bihar, and arguably one of the busiest Hanuman temples in India. Situated just steps from Patna Junction — one of India\'s largest railway stations — it serves as a stop for millions of pilgrims and travellers. The temple distributes over 500 kg of prasad daily, purchased and managed by the temple trust on behalf of devotees. There is no VIP or priority darshan — every devotee waits in the same queue, from politicians to farmers. This equality is considered one of the temple\'s most sacred principles.',
    aboutHi: 'महावीर मंदिर बिहार का सबसे व्यस्त हनुमान मंदिर है। पटना जंक्शन से महज़ कुछ कदम की दूरी पर, लाखों यात्री यहाँ दर्शन करते हैं। 500 किलो प्रसाद प्रतिदिन मंदिर ट्रस्ट द्वारा वितरित होता है। कोई VIP दर्शन नहीं — सब एक ही पंक्ति में।',
    specialPuja: [
      'Mangala Aarti — 5:30 AM',
      'Shringaar Darshan — 6:30 AM',
      'Rajbhog Bhog — 12:30 PM',
      'Sandhya Aarti — 7:00 PM',
      'Shayan Aarti — 9:00 PM',
    ],
    bestTime: 'Tuesday and Saturday are especially significant. Hanuman Jayanti sees a massive city-wide procession.',
    offerings: 'The temple purchases and distributes prasad on your behalf — simply make a donation at the donation counter.',
    offeringsHi: 'मंदिर आपकी ओर से प्रसाद खरीदता और वितरित करता है — बस दान काउंटर पर राशि दें।',
    stay: 'Numerous hotels near Patna Junction — Hotel Chanakya, Hotel Windsor, and budget lodges within 500 meters.',
    tips: 'Arrive early morning to avoid the massive queues. The shortest waits are before 7 AM.',
    mapQuery: 'Mahavir+Mandir+Patna+Junction',
  },
  {
    id: 6,
    nameEn: 'Mehandipur Balaji',
    nameHi: 'मेहंदीपुर बालाजी',
    locationEn: 'Dausa, Rajasthan',
    locationHi: 'दौसा, राजस्थान',
    state: 'RJ',
    emoji: '🔱',
    address: 'Mehandipur, Dausa District, Rajasthan 321613',
    dailyVisitors: '10,000+',
    railway: 'Bandikui Railway Station (20 km)',
    airport: 'Jaipur International Airport (70 km)',
    timings: '5:30 AM – 1:00 PM • 4:00 PM – 9:00 PM',
    significance: 'World-famous for liberation from negative energies and spiritual afflictions; unique rituals unlike any other temple in India.',
    significanceHi: 'नकारात्मक ऊर्जाओं और आसुरी प्रभाव से मुक्ति के लिए विश्वप्रसिद्ध। भारत में अन्यत्र न दिखने वाले अनोखे अनुष्ठान।',
    about: 'Mehandipur Balaji is one of the most spiritually intense temples in India. It is world-renowned for its power to liberate devotees from negative spiritual influences and mental afflictions. The temple has three presiding deities: Balaji (Hanuman), Bhairav Dev, and Pret Raj. The atmosphere here is unlike any other temple — deeply powerful, sometimes overwhelming. Unique rituals are performed here that involve intense prayer, chanting, and specific pujas. The priests have specialized knowledge passed down through generations. First-time visitors are advised to take guidance from the temple priests.',
    aboutHi: 'मेहंदीपुर बालाजी भारत के सबसे आध्यात्मिक रूप से तीव्र तीर्थ स्थलों में से एक है। यहाँ बालाजी, भैरव देव और प्रेत राज की पूजा होती है। वातावरण अत्यंत शक्तिशाली और अनोखा है। पहली बार आने वाले भक्त पुजारियों से मार्गदर्शन लें।',
    specialPuja: [
      'Prabhati Aarti — 5:30 AM',
      'Shringaar Bhog — 8:00 AM',
      'Rajbhog — 12:00 PM',
      'Sandhya Aarti — 6:30 PM',
      'Saturday Shani Puja — special',
    ],
    bestTime: 'Saturdays for Shani puja. Avoid visiting at night. Hanuman Jayanti is particularly powerful here.',
    offerings: 'Specific prasad items are required — take guidance from priests at the temple. Do not bring prasad from outside without checking.',
    offeringsHi: 'विशिष्ट प्रसाद की आवश्यकता होती है — मंदिर के पुजारियों से मार्गदर्शन लें। बाहर से प्रसाद लाने से पहले पूछें।',
    stay: 'Dharamshalas in Mehandipur village. Hotels in Dausa (20 km) or Bandikui. Book well in advance on Saturdays.',
    tips: 'Keep mobile phones away during rituals. The atmosphere can be intense for first-timers. Don\'t visit alone if possible. Dress modestly.',
    mapQuery: 'Mehandipur+Balaji+Dausa+Rajasthan',
  },
  {
    id: 7,
    nameEn: 'Hanuman Tekri',
    nameHi: 'हनुमान टेकरी',
    locationEn: 'Guna, Madhya Pradesh',
    locationHi: 'गुना, मध्य प्रदेश',
    state: 'MP',
    emoji: '⛩️',
    address: 'Tekri Sarkar, Hanuman Tekri, Guna, Madhya Pradesh 473001',
    dailyVisitors: '5,000+',
    railway: 'Guna Railway Station (3 km)',
    airport: 'Gwalior Airport (200 km)',
    timings: '5:00 AM – 12:00 PM • 4:00 PM – 9:00 PM',
    significance: 'The sacred hillock (tekri) that gives this very website its name — a place of deep local faith and community devotion.',
    significanceHi: 'यह वही पावन तेकरी है जिसके नाम पर यह वेबसाइट समर्पित है — गुना की गहरी आस्था और सामुदायिक भक्ति का केंद्र।',
    about: 'Hanuman Tekri is a sacred hillock in Guna, Madhya Pradesh — "tekri" means a small hill — and it is the heart of local Hanuman devotion in the region. The temple sits at the top of the hillock with a panoramic view of the entire Guna town and the surrounding plains. Every Tuesday morning, the hillock fills with devotees who climb the steps in devotion. The temple is managed by local priests whose families have served here for generations. The energy here is intimate, community-rooted, and deeply personal — different from the grand temples of larger cities.',
    aboutHi: 'हनुमान टेकरी गुना, मध्य प्रदेश की एक पावन पहाड़ी पर स्थित है। "तेकरी" का अर्थ है छोटी पहाड़ी। मंदिर के शिखर से पूरे गुना शहर और आसपास के मैदानों का सुंदर दृश्य दिखता है। प्रत्येक मंगलवार भोर में भक्तों से तेकरी गूंज उठती है। यहाँ की भक्ति व्यक्तिगत और समुदाय-केंद्रित है।',
    specialPuja: [
      'Pratah Aarti — 5:00 AM',
      'Tuesday Mangalwar Puja — dawn (special)',
      'Sandhya Aarti — 6:30 PM',
      'Hanuman Jayanti Fair — grand local event',
    ],
    bestTime: 'Tuesday dawn (Mangalwar) is the most auspicious. Hanuman Jayanti brings the whole city together.',
    offerings: 'Sindoor, chameli mala (jasmine garland), boondi laddoo. Simple and heartfelt offerings are most valued here.',
    offeringsHi: 'सिंदूर, चमेली माला, बूंदी के लड्डू। यहाँ सरल और श्रद्धापूर्ण भेंट सबसे मूल्यवान मानी जाती है।',
    stay: 'Guna city has hotels and guest houses. Railway Station retiring rooms available for overnight stays.',
    tips: 'The climb is short and manageable. Go at dawn on Tuesday for the most magical experience. The view of Guna from the top is beautiful.',
    mapQuery: 'Hanuman+Tekri+Guna+Madhya+Pradesh',
  },
  {
    id: 8,
    nameEn: 'Kashtabhanjan Dev (Salangpur)',
    nameHi: 'कष्टभंजन देव (सालंगपुर)',
    locationEn: 'Sarangpur, Gujarat',
    locationHi: 'सारंगपुर, गुजरात',
    state: 'GJ',
    emoji: '🛕',
    address: 'Salangpur, Botad District, Gujarat 364230',
    dailyVisitors: '15,000+',
    railway: 'Botad Railway Station (30 km)',
    airport: 'Bhavnagar Airport (90 km)',
    timings: '6:00 AM – 12:00 PM • 3:00 PM – 8:30 PM',
    significance: 'Managed by BAPS Swaminarayan Sanstha; unique architecture; miraculously known for healing and liberation from distress.',
    significanceHi: 'BAPS स्वामीनारायण संस्था द्वारा प्रबंधित। अनोखी वास्तुकला। कष्ट निवारण और उपचार के लिए चमत्कारी ख्याति।',
    about: 'Kashtabhanjan Dev at Salangpur is one of the most celebrated Hanuman temples in western India. "Kashtabhanjan" means "destroyer of suffering" — and this temple is revered for exactly that power. Managed by the BAPS Swaminarayan Sanstha, the temple complex is beautifully maintained with stunning architecture, gardens, and facilities. The presiding deity is a striking form of Hanuman Ji seated in a powerful posture. The temple is known across Gujarat and Maharashtra for miraculous interventions in cases of illness, mental distress, and spiritual affliction.',
    aboutHi: 'कष्टभंजन देव (सालंगपुर) पश्चिम भारत के सर्वाधिक प्रसिद्ध हनुमान मंदिरों में से एक है। "कष्टभंजन" का अर्थ है कष्टों का नाश करने वाला। BAPS स्वामीनारायण संस्था द्वारा सुव्यवस्थित यह मंदिर परिसर अत्यंत सुंदर है। रोग, मानसिक पीड़ा और आध्यात्मिक समस्याओं में चमत्कारी लाभ की ख्याति है।',
    specialPuja: [
      'Mangala Aarti — 6:00 AM',
      'Shringaar Darshan — 7:00 AM',
      'Rajbhog — 11:30 AM',
      'Sandhya Aarti — 6:30 PM',
      'Saturday and Kartik Purnima festivals',
    ],
    bestTime: 'Saturdays. Kartik Purnima (October/November) for grand festival. Avoid peak summer.',
    offerings: 'Modak, flowers, coconut. The temple provides its own specific prasad which is recommended.',
    offeringsHi: 'मोदक, फूल, नारियल। मंदिर का अपना विशेष प्रसाद उपलब्ध है जो सर्वोत्तम माना जाता है।',
    stay: 'BAPS dharamshalas near the temple (affordable, well-maintained). Hotels in Botad (30 km).',
    tips: 'Dress code is observed: men in dhoti-kurta or full pants preferred; women in saree or salwar-kameez. Shorts and sleeveless are not permitted.',
    mapQuery: 'Kashtabhanjan+Dev+Salangpur+Gujarat',
  },
  {
    id: 9,
    nameEn: 'Anjanadri Hill',
    nameHi: 'अंजनाद्रि पहाड़ी',
    locationEn: 'Hampi, Karnataka',
    locationHi: 'हम्पी, कर्नाटक',
    state: 'KA',
    emoji: '🌄',
    address: 'Anjanadri Hill (Anjanahari), near Gangavati, Koppal District, Karnataka 583227',
    dailyVisitors: '2,000+',
    railway: 'Hospet Railway Station (15 km)',
    airport: 'Bellary Airport (60 km)',
    timings: 'Sunrise to Sunset (temple accessible all day)',
    significance: 'Believed to be the actual birthplace of Hanuman Ji — 575 ancient steps lead to the summit, with stunning views of Hampi and the Tungabhadra river.',
    significanceHi: 'हनुमान जी की जन्मस्थली माना जाता है — 575 प्राचीन सीढ़ियाँ शिखर तक जाती हैं। हम्पी और तुंगभद्रा नदी का अद्भुत दृश्य।',
    about: 'Anjanadri Hill near Hampi is believed by many to be the actual birthplace of Hanuman Ji — the very hill where Anjana Mata gave birth to him. The hill rises dramatically from the surrounding plains, and from its summit, one can see the ancient ruins of Hampi (the Vijayanagara empire capital), the Tungabhadra river, and the boulder-strewn landscape in all directions. The 575-step climb takes 30–45 minutes and is one of the most spiritually rewarding treks in South India. A ferry ride across the Tungabhadra river is part of the pilgrimage experience.',
    aboutHi: 'अंजनाद्रि पहाड़ी (अंजनाहारी) हनुमान जी की जन्मस्थली मानी जाती है। यहाँ 575 सीढ़ियाँ शिखर तक ले जाती हैं। ऊपर से हम्पी खंडहर, तुंगभद्रा नदी और विशाल पत्थरीले मैदान का अद्भुत नज़ारा मिलता है। तुंगभद्रा नदी पर नौका-यात्रा भी इस तीर्थ का हिस्सा है।',
    specialPuja: [
      'Sunrise Puja — at dawn',
      'Abhishek — morning hours',
      'Special puja on Tuesdays and Saturdays',
      'Hanuman Jayanti — special significance at birthplace',
    ],
    bestTime: 'October to February. Avoid April–June (intense heat on the rocky climb). Hanuman Jayanti at the birthplace is deeply moving.',
    offerings: 'Coconut, bananas, marigold flowers. Simple and pure offerings are traditional here.',
    offeringsHi: 'नारियल, केले, गेंदे के फूल। यहाँ सरल और शुद्ध भेंट की परंपरा है।',
    stay: 'Hampi has guest houses and KSTDC (Karnataka Tourism) accommodations. Hospet (15 km) has more hotels.',
    tips: 'Wear sports shoes — the rocky steps can be slippery. Carry 1–1.5 litres of water. Start the climb before 8 AM to avoid the heat. The ferry is seasonal — check timings.',
    mapQuery: 'Anjanadri+Hill+Hampi+Karnataka',
  },
]

const YATRA_TIPS = [
  { icon: '👘', tip: 'Dress conservatively — avoid shorts or sleeveless. Simple, clean clothing shows respect.', tipHi: 'शालीन वस्त्र पहनें — शॉर्ट्स या आस्तीन-रहित कपड़े न पहनें। साफ, सरल पहनावा आदर का प्रतीक है।' },
  { icon: '📅', tip: 'Visit on Tuesdays — Hanuman Ji\'s special day. The energy at all these temples on Tuesday is uniquely powerful.', tipHi: 'मंगलवार को दर्शन करें — हनुमान जी का विशेष दिन। मंगलवार को इन सभी मंदिरों में विशेष ऊर्जा होती है।' },
  { icon: '🌺', tip: 'Carry sindoor and red flowers — these are universally accepted offerings at any Hanuman temple.', tipHi: 'सिंदूर और लाल फूल साथ रखें — ये किसी भी हनुमान मंदिर में सार्वभौमिक भेंट हैं।' },
  { icon: '🤫', tip: 'Observe silence inside the sanctum. The sanctum is a field of energy — maintain calmness and focus.', tipHi: 'गर्भगृह में मौन रहें। गर्भगृह एक ऊर्जा-क्षेत्र है — शांत और एकाग्र रहें।' },
  { icon: '📸', tip: 'Photography rules vary by temple. Always ask before photographing the main deity or rituals.', tipHi: 'फोटोग्राफी के नियम मंदिर-दर-मंदिर भिन्न होते हैं। मुख्य मूर्ति या अनुष्ठान की फोटो से पहले पूछें।' },
  { icon: '🌅', tip: 'The best time at any temple is Mangala Aarti (dawn) — the deity\'s energy is most accessible at this hour.', tipHi: 'किसी भी मंदिर में मंगला आरती (भोर) का समय सर्वश्रेष्ठ है — इस समय देव-ऊर्जा सबसे सुलभ होती है।' },
]

const STATE_FILTERS = [
  { code: 'ALL', label: 'All States', labelHi: 'सभी' },
  { code: 'UP', label: 'Uttar Pradesh', labelHi: 'उत्तर प्रदेश' },
  { code: 'RJ', label: 'Rajasthan', labelHi: 'राजस्थान' },
  { code: 'HP', label: 'Himachal Pradesh', labelHi: 'हिमाचल प्रदेश' },
  { code: 'BR', label: 'Bihar', labelHi: 'बिहार' },
  { code: 'MP', label: 'Madhya Pradesh', labelHi: 'मध्य प्रदेश' },
  { code: 'GJ', label: 'Gujarat', labelHi: 'गुजरात' },
  { code: 'KA', label: 'Karnataka', labelHi: 'कर्नाटक' },
]

export default function TirthYatraView() {
  const { language, goBack } = useTempleStore()
  const t = (en, hi) => language === 'hi' ? hi : en
  const [expandedTemple, setExpandedTemple] = useState(null)
  const [selectedState, setSelectedState] = useState('ALL')
  const [expandedSection, setExpandedSection] = useState({})

  const filteredTemples = useMemo(
    () => selectedState === 'ALL' ? TEMPLES : TEMPLES.filter(te => te.state === selectedState),
    [selectedState]
  )

  const toggleTemple = (id) => setExpandedTemple(prev => prev === id ? null : id)
  const toggleSection = (templeId, section) => {
    setExpandedSection(prev => ({
      ...prev,
      [`${templeId}-${section}`]: !prev[`${templeId}-${section}`],
    }))
  }

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
          {t('TIRTH YATRA', 'तीर्थ यात्रा')}
        </span>
        <div style={{ fontSize: '1.3rem' }}>🗺️</div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem' }}>

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
          }}>तीर्थ यात्रा</h1>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.62rem',
            color: 'rgba(201,169,110,0.6)', margin: '0 0 1.25rem', letterSpacing: '0.32em',
          }}>TIRTH YATRA</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.2))' }} />
            <span style={{ color: 'rgba(255,193,7,0.35)', fontSize: '0.75rem' }}>ॐ</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.2))' }} />
          </div>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.92rem' : '0.78rem',
            color: 'rgba(201,169,110,0.55)', maxWidth: '460px',
            margin: '0 auto 1.5rem', lineHeight: 1.9,
          }}>
            {t(
              'A complete guide to the 9 most revered Hanuman pilgrimage sites in India — timings, offerings, travel directions and tips.',
              'भारत के 9 सर्वाधिक पूजनीय हनुमान तीर्थ स्थलों का सम्पूर्ण मार्गदर्शन।'
            )}
          </p>
          {/* Stat pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { label: t('9 Temples', '9 मंदिर'), icon: '🛕' },
              { label: t('7 States', '7 राज्य'), icon: '🗺️' },
              { label: t('1 Lakh+ Daily Visitors', '1 लाख+ दैनिक भक्त'), icon: '🙏' },
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

        {/* Plan Your Yatra tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(26,8,42,0.95), rgba(18,8,42,0.95))',
            border: '1px solid rgba(255,193,7,0.25)',
            borderRadius: '18px', padding: '1.5rem', marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>✈️</span>
            <h3 style={{
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
              color: '#ffc107', margin: 0, fontSize: '0.9rem', letterSpacing: '0.1em',
            }}>
              {t('PLAN YOUR YATRA', 'यात्रा की योजना बनाएं')}
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {YATRA_TIPS.map((tip, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                background: 'rgba(255,193,7,0.04)', borderRadius: '10px',
                padding: '0.7rem 0.85rem', border: '1px solid rgba(255,193,7,0.08)',
              }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>{tip.icon}</span>
                <span style={{
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                  fontSize: language === 'hi' ? '0.85rem' : '0.81rem',
                  color: 'rgba(255,248,231,0.8)', lineHeight: 1.6,
                }}>
                  {t(tip.tip, tip.tipHi)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* State filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
            color: '#c9a96e', fontSize: '0.65rem', letterSpacing: '0.16em',
            marginBottom: '0.65rem', paddingLeft: '0.25rem',
          }}>
            {t('FILTER BY STATE', 'राज्य के अनुसार')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {STATE_FILTERS.map((sf) => (
              <button
                key={sf.code}
                onClick={() => setSelectedState(sf.code)}
                style={{
                  background: selectedState === sf.code ? 'rgba(255,193,7,0.2)' : 'rgba(255,193,7,0.05)',
                  border: `1px solid ${selectedState === sf.code ? 'rgba(255,193,7,0.5)' : 'rgba(255,193,7,0.15)'}`,
                  borderRadius: '20px', padding: '0.3rem 0.8rem',
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                  fontSize: language === 'hi' ? '0.8rem' : '0.75rem',
                  color: selectedState === sf.code ? '#ffc107' : '#c9a96e',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {t(sf.label, sf.labelHi)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Temples list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredTemples.map((temple, idx) => {
              const isOpen = expandedTemple === temple.id
              return (
                <motion.div
                  key={temple.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: 0.04 * idx, layout: { duration: 0.3 } }}
                  style={{
                    background: 'rgba(18,8,42,0.82)',
                    border: `1px solid ${isOpen ? 'rgba(255,193,7,0.4)' : 'rgba(255,193,7,0.15)'}`,
                    borderRadius: '18px', overflow: 'hidden',
                    transition: 'border-color 0.3s',
                  }}
                >
                  {/* Temple Card Header */}
                  <button
                    onClick={() => toggleTemple(temple.id)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '1.1rem 1.25rem', textAlign: 'left',
                    }}
                  >
                    {/* Top row: number, emoji, names, state badge */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                      <div style={{
                        flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
                        background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Cinzel, serif', color: '#ffc107', fontSize: '0.75rem',
                      }}>
                        {temple.id}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '1.1rem' }}>{temple.emoji}</span>
                          <span style={{
                            fontFamily: 'Noto Sans Devanagari, serif',
                            color: '#ffc107', fontSize: '1rem',
                          }}>{temple.nameHi}</span>
                          <span style={{
                            fontFamily: 'Cinzel, serif',
                            color: 'rgba(201,169,110,0.65)', fontSize: '0.72rem',
                          }}>/ {temple.nameEn}</span>
                          <span style={{
                            background: 'rgba(255,193,7,0.1)',
                            border: '1px solid rgba(255,193,7,0.25)',
                            borderRadius: '5px', padding: '0.1rem 0.45rem',
                            fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
                            color: '#c9a96e', letterSpacing: '0.1em',
                          }}>{temple.state}</span>
                        </div>
                        <div style={{
                          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                          fontSize: '0.78rem', color: 'rgba(255,248,231,0.55)',
                        }}>
                          {t(temple.locationEn, temple.locationHi)}
                        </div>
                      </div>
                      <div style={{
                        flexShrink: 0, color: '#c9a96e', fontSize: '0.85rem',
                        transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s',
                        alignSelf: 'center',
                      }}>▶</div>
                    </div>

                    {/* Quick stats row */}
                    <div style={{
                      display: 'flex', gap: '0.5rem', marginTop: '0.8rem', flexWrap: 'wrap',
                    }}>
                      {[
                        { icon: '⏰', val: temple.timings },
                        { icon: '🚂', val: temple.railway },
                        { icon: '✈️', val: temple.airport },
                        { icon: '👥', val: temple.dailyVisitors },
                      ].map((stat, si) => (
                        <div key={si} style={{
                          display: 'flex', alignItems: 'center', gap: '0.3rem',
                          background: 'rgba(255,193,7,0.05)',
                          border: '1px solid rgba(255,193,7,0.1)',
                          borderRadius: '7px', padding: '0.2rem 0.55rem',
                          fontSize: '0.68rem', fontFamily: 'Inter, sans-serif',
                          color: 'rgba(255,248,231,0.6)',
                        }}>
                          <span>{stat.icon}</span>
                          <span>{stat.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Significance badge */}
                    <div style={{
                      marginTop: '0.65rem',
                      background: 'rgba(255,193,7,0.06)',
                      borderLeft: '3px solid rgba(255,193,7,0.4)',
                      borderRadius: '0 8px 8px 0',
                      padding: '0.4rem 0.75rem',
                    }}>
                      <p style={{
                        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                        fontSize: language === 'hi' ? '0.82rem' : '0.78rem',
                        color: '#c9a96e', margin: 0, lineHeight: 1.5,
                      }}>
                        ✨ {t(temple.significance, temple.significanceHi)}
                      </p>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="details"
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

                          {/* Address */}
                          <div style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                            background: 'rgba(255,193,7,0.04)', borderRadius: '10px',
                            padding: '0.6rem 0.8rem', marginBottom: '1rem',
                            border: '1px solid rgba(255,193,7,0.08)',
                          }}>
                            <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>📍</span>
                            <span style={{
                              fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
                              color: 'rgba(255,248,231,0.7)', lineHeight: 1.5,
                            }}>{temple.address}</span>
                          </div>

                          {/* Section accordion: About */}
                          {[
                            {
                              key: 'about',
                              icon: '🛕',
                              label: t('About the Temple', 'मंदिर के बारे में'),
                              content: (
                                <div>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.84rem',
                                    color: 'rgba(255,248,231,0.82)', lineHeight: 1.8, margin: '0 0 0.75rem',
                                  }}>{temple.about}</p>
                                  <p style={{
                                    fontFamily: 'Noto Sans Devanagari, serif', fontSize: '0.88rem',
                                    color: 'rgba(255,248,231,0.72)', lineHeight: 1.9, margin: 0,
                                  }}>{temple.aboutHi}</p>
                                </div>
                              ),
                            },
                            {
                              key: 'puja',
                              icon: '🪔',
                              label: t('Darshan Timings & Puja', 'दर्शन समय और पूजा'),
                              content: (
                                <div>
                                  <div style={{
                                    fontFamily: 'Cinzel, serif', color: '#c9a96e', fontSize: '0.62rem',
                                    letterSpacing: '0.12em', marginBottom: '0.4rem',
                                  }}>{t('TIMINGS', 'समय')}</div>
                                  <div style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.84rem',
                                    color: '#ffc107', marginBottom: '0.9rem', fontWeight: '500',
                                  }}>{temple.timings}</div>
                                  <div style={{
                                    fontFamily: 'Cinzel, serif', color: '#c9a96e', fontSize: '0.62rem',
                                    letterSpacing: '0.12em', marginBottom: '0.4rem',
                                  }}>{t('SPECIAL PUJA', 'विशेष पूजा')}</div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    {temple.specialPuja.map((p, pi) => (
                                      <div key={pi} style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                                        color: 'rgba(255,248,231,0.78)',
                                      }}>
                                        <span style={{ color: '#ffc107', flexShrink: 0 }}>◆</span>
                                        {p}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ),
                            },
                            {
                              key: 'reach',
                              icon: '🚗',
                              label: t('How to Reach', 'कैसे पहुँचें'),
                              content: (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                  {[
                                    { icon: '🚂', label: t('Nearest Railway', 'निकटतम रेलवे'), val: temple.railway },
                                    { icon: '✈️', label: t('Nearest Airport', 'निकटतम हवाई अड्डा'), val: temple.airport },
                                  ].map((r, ri) => (
                                    <div key={ri} style={{
                                      display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                                      background: 'rgba(255,193,7,0.04)', borderRadius: '9px',
                                      padding: '0.6rem 0.75rem', border: '1px solid rgba(255,193,7,0.08)',
                                    }}>
                                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{r.icon}</span>
                                      <div>
                                        <div style={{
                                          fontFamily: 'Cinzel, serif', color: '#c9a96e',
                                          fontSize: '0.6rem', letterSpacing: '0.1em', marginBottom: '0.2rem',
                                        }}>{r.label}</div>
                                        <div style={{
                                          fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                                          color: 'rgba(255,248,231,0.82)',
                                        }}>{r.val}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              key: 'offerings',
                              icon: '🌺',
                              label: t('What to Offer', 'क्या चढ़ाएं'),
                              content: (
                                <div>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.84rem',
                                    color: 'rgba(255,248,231,0.82)', lineHeight: 1.7, margin: '0 0 0.6rem',
                                  }}>{temple.offerings}</p>
                                  <p style={{
                                    fontFamily: 'Noto Sans Devanagari, serif', fontSize: '0.88rem',
                                    color: 'rgba(255,248,231,0.68)', lineHeight: 1.8, margin: 0,
                                  }}>{temple.offeringsHi}</p>
                                </div>
                              ),
                            },
                            {
                              key: 'besttime',
                              icon: '📅',
                              label: t('Best Time to Visit', 'जाने का उचित समय'),
                              content: (
                                <p style={{
                                  fontFamily: 'Inter, sans-serif', fontSize: '0.84rem',
                                  color: 'rgba(255,248,231,0.82)', lineHeight: 1.7, margin: 0,
                                }}>{temple.bestTime}</p>
                              ),
                            },
                            {
                              key: 'stay',
                              icon: '🏨',
                              label: t('Where to Stay', 'ठहरने की व्यवस्था'),
                              content: (
                                <div>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: '0.84rem',
                                    color: 'rgba(255,248,231,0.82)', lineHeight: 1.7, margin: '0 0 0.7rem',
                                  }}>{temple.stay}</p>
                                  <div style={{
                                    background: 'rgba(255,193,7,0.06)', borderRadius: '10px',
                                    padding: '0.65rem 0.85rem', border: '1px solid rgba(255,193,7,0.12)',
                                  }}>
                                    <div style={{
                                      fontFamily: 'Cinzel, serif', color: '#ffc107',
                                      fontSize: '0.6rem', letterSpacing: '0.12em', marginBottom: '0.35rem',
                                    }}>{t('TRAVEL TIP', 'यात्रा सुझाव')}</div>
                                    <p style={{
                                      fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                                      color: 'rgba(255,248,231,0.75)', margin: 0, lineHeight: 1.6,
                                    }}>{temple.tips}</p>
                                  </div>
                                </div>
                              ),
                            },
                          ].map((section) => {
                            const sKey = `${temple.id}-${section.key}`
                            const isSectionOpen = expandedSection[sKey]
                            return (
                              <div key={section.key} style={{ marginBottom: '0.5rem' }}>
                                <button
                                  onClick={() => toggleSection(temple.id, section.key)}
                                  style={{
                                    width: '100%', background: isSectionOpen ? 'rgba(255,193,7,0.08)' : 'rgba(255,193,7,0.04)',
                                    border: '1px solid rgba(255,193,7,0.12)',
                                    borderRadius: '10px', cursor: 'pointer',
                                    padding: '0.65rem 0.85rem',
                                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                                    transition: 'background 0.2s',
                                  }}
                                >
                                  <span style={{ fontSize: '0.95rem' }}>{section.icon}</span>
                                  <span style={{
                                    fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                                    fontSize: language === 'hi' ? '0.85rem' : '0.72rem',
                                    color: '#c9a96e', letterSpacing: language === 'hi' ? '0' : '0.08em',
                                    flex: 1, textAlign: 'left',
                                  }}>{section.label}</span>
                                  <span style={{
                                    color: '#c9a96e', fontSize: '0.75rem',
                                    transform: isSectionOpen ? 'rotate(90deg)' : 'none',
                                    transition: 'transform 0.25s',
                                  }}>▶</span>
                                </button>
                                <AnimatePresence initial={false}>
                                  {isSectionOpen && (
                                    <motion.div
                                      key="sec-content"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      style={{ overflow: 'hidden' }}
                                    >
                                      <div style={{
                                        padding: '0.85rem 0.85rem 0.1rem',
                                        background: 'rgba(255,193,7,0.02)',
                                        borderRadius: '0 0 10px 10px',
                                        border: '1px solid rgba(255,193,7,0.08)',
                                        borderTop: 'none',
                                        marginBottom: '0.1rem',
                                      }}>
                                        {section.content}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}

                          {/* Google Maps link */}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${temple.mapQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                              marginTop: '0.75rem',
                              background: 'rgba(255,193,7,0.08)',
                              border: '1px solid rgba(255,193,7,0.25)',
                              borderRadius: '9px', padding: '0.5rem 1rem',
                              fontFamily: 'Cinzel, serif', fontSize: '0.72rem',
                              color: '#c9a96e', letterSpacing: '0.08em',
                              textDecoration: 'none',
                            }}
                          >
                            <span>📍</span>
                            {t('View on Google Maps', 'Google Maps पर देखें')}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem 1rem' }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🙏</div>
          <div style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            color: '#c9a96e', lineHeight: 2,
          }}>
            जय बजरंग बली — जय हनुमान
          </div>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.72rem',
            color: 'rgba(255,248,231,0.35)', marginTop: '0.4rem', letterSpacing: '0.12em',
          }}>
            JAI BAJRANG BALI — JAI HANUMAN
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
            color: 'rgba(255,248,231,0.3)', marginTop: '0.5rem',
          }}>
            May every step of your yatra be blessed
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
