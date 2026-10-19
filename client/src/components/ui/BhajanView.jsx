import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

// ─── Bhajan data ────────────────────────────────────────────────────────────

const BHAJANS = [
  {
    id: 1,
    titleHi: 'जय हनुमान ज्ञान गुण सागर',
    titleEn: 'Jai Hanuman Gyan Gun Sagar',
    tradition: 'Tulsidas / Gulshan Kumar',
    traditionHi: 'तुलसीदास / गुलशन कुमार',
    mood: 'devotional',
    occasion: ['daily', 'tuesday', 'festivals'],
    firstLine: 'जय हनुमान ज्ञान गुण सागर, जय कपीस तिहुँ लोक उजागर।',
    meaning: 'The opening invocation of the Hanuman Chalisa, sung as a bhajan in the devotional style of Gulshan Kumar and Hariharan. This verse praises Hanuman Ji as the ocean of wisdom and virtue, whose glory illuminates all three worlds. Reciting it at dawn fills the heart with courage and divine grace.',
    meaningHi: 'हनुमान चालीसा की प्रारंभिक वंदना को भजन के रूप में गाया जाता है। यह श्लोक हनुमान जी को ज्ञान और गुण के सागर के रूप में प्रशंसित करता है, जिनकी महिमा तीनों लोकों को प्रकाशित करती है।',
    specialNote: 'This is the Chalisa opening — for full 40 verses, visit the Chalisa Gallery.',
    specialNoteHi: 'यह चालीसा का आरंभ है — पूर्ण ४० चौपाइयों के लिए चालीसा गैलरी देखें।',
    lyrics: `जय हनुमान ज्ञान गुण सागर।
जय कपीस तिहुँ लोक उजागर॥

राम दूत अतुलित बल धामा।
अञ्जनि-पुत्र पवनसुत नामा॥

महावीर विक्रम बजरंगी।
कुमति निवार सुमति के संगी॥

कञ्चन बरन बिराज सुबेसा।
कानन कुण्डल कुञ्चित केसा॥

हाथ बज्र औ ध्वजा बिराजे।
काँधे मूँज जनेऊ साजे॥

शंकर सुवन केसरी नन्दन।
तेज प्रताप महा जग वन्दन॥

विद्यावान गुनी अति चातुर।
राम काज करिबे को आतुर॥

प्रभु चरित्र सुनिबे को रसिया।
राम लखन सीता मन बसिया॥`,
    transliteration: `Jai Hanumaan Gyaan Gun Saagar.
Jai Kapees Tihun Lok Ujaagar.

Ram Doot Atulit Bal Dhaama.
Anjani-Putra Pavan-Sut Naama.

Mahaveer Vikram Bajrangi.
Kumati Nivaar Sumati Ke Sangi.

Kanchan Baran Biraaj Subesa.
Kaanan Kundal Kunchit Kesa.

Haath Bajra Au Dhwaja Biraaje.
Kandhe Moonj Janeu Saaje.

Shankar Suvan Kesari Nandan.
Tej Partaap Mahaa Jag Vandan.

Vidyavaan Guni Ati Chaatur.
Ram Kaaj Karibe Ko Aatur.

Prabhu Charitra Sunibe Ko Rasiya.
Ram Lakhan Seeta Man Basiya.`,
    youtube: 'https://www.youtube.com/results?search_query=jai+hanuman+gyan+gun+sagar+gulshan+kumar+hariharan',
  },
  {
    id: 2,
    titleHi: 'पवनपुत्र संकट हरण',
    titleEn: 'Pavanputra Sankat Harana',
    tradition: 'Folk / Bhakti tradition',
    traditionHi: 'लोक / भक्ति परंपरा',
    mood: 'devotional',
    occasion: ['daily', 'tuesday'],
    firstLine: 'पवनपुत्र संकट हरण, मंगल मूरति रूप।',
    meaning: 'A traditional folk bhajan that hails Hanuman Ji as the son of the wind-god (Pavana), the remover of all suffering. Every verse calls upon him to dwell in the heart along with Rama, Lakshmana, and Sita. Sung in the early morning, this bhajan invites divine protection for the entire day.',
    meaningHi: 'एक पारंपरिक लोक भजन जो पवनपुत्र हनुमान जी को सभी कष्टों के हरणकर्ता के रूप में वंदित करता है। प्रत्येक पद में उन्हें राम, लक्ष्मण, सीता सहित हृदय में निवास करने की प्रार्थना है।',
    lyrics: `पवनपुत्र संकट हरण, मंगल मूरति रूप।
राम लखन सीता सहित, हृदय बसहु सुर भूप॥

अञ्जनि के लाल, रुद्र अवतार।
तुलसीदास की विनय, सुनहु हनुमान दातार॥
संकट से मुक्त करो, जीवन करो सफल।
भक्तन के बल-वीर, तुम हो दयावन्त॥

लंका दाहक भीम, रण भूमि शूर।
राम काज सिद्धि दाता, कपि के हैं धूर॥
सुग्रीव के मित्र, विभीषण के साथ।
भक्तन की रक्षा करहु, पकड़ि के हाथ॥

महाबली महावीर, बल-बुद्धि-विद्या।
सदा प्रसन्न रहो, हे प्रभु हनुमान जी॥
सूर्य को निगलन वाले, अमित पराक्रम।
भवसागर पार करो, जपत तव नाम॥

सिंदूर-सजे भाल, चमके जोत अपार।
गदा-धारी वीर, राम के दरबार॥
चरण-शरण में आए, सभी दुखिया दास।
करो कृपा हे नाथ, पूरण करो आस॥

त्रिकाल-पूज्य प्रभु, जय जय हनुमान।
राम-नाम-रत रहो, करो कल्याण॥
ओम नमो हनुमते, बलवन्त उदार।
पवनपुत्र संकट हरण, जय जयकार॥`,
    transliteration: `Pavanputra Sankat Haran, Mangal Moorti Roop.
Ram Lakhan Sita Sahit, Hriday Basahu Sur Bhoop.

Anjani Ke Laal, Rudra Avtaar.
Tulsidas Ki Vinay, Sunahu Hanumaan Daataar.
Sankat Se Mukt Karo, Jeevan Karo Safal.
Bhaktan Ke Bal-Veer, Tum Ho Dayaavant.

Lanka Daahak Bheem, Ran Bhoomi Shoor.
Ram Kaaj Siddhi Daata, Kapi Ke Hain Dhoor.
Sugreev Ke Mitra, Vibheeshan Ke Saath.
Bhaktan Ki Raksha Karahu, Pakad Ke Haath.

Mahabali Mahaveer, Bal-Buddhi-Vidya.
Sada Prasann Raho, He Prabhu Hanumaan Ji.
Surya Ko Niglan Waale, Amit Paraakram.
Bhavsagar Paar Karo, Japat Tav Naam.

Sindoor Saje Bhaal, Chamke Jot Apaar.
Gada-Dhaari Veer, Ram Ke Darbaar.
Charan-Sharan Mein Aaye, Sabhi Dukhiya Daas.
Karo Kripa He Naath, Puran Karo Aas.

Trikaal-Poojya Prabhu, Jai Jai Hanumaan.
Ram-Naam-Rat Raho, Karo Kalyaan.
Om Namo Hanumate, Balvant Udaar.
Pavanputra Sankat Haran, Jai Jaikaar.`,
    youtube: 'https://www.youtube.com/results?search_query=pavanputra+sankat+haran+bhajan',
  },
  {
    id: 3,
    titleHi: 'जय बजरंग बली',
    titleEn: 'Jai Bajrang Bali',
    tradition: 'Folk / Kirtan tradition',
    traditionHi: 'लोक / कीर्तन परंपरा',
    mood: 'energetic',
    occasion: ['tuesday', 'festivals'],
    firstLine: 'जय बजरंग बली, हनुमान महावीर।',
    meaning: 'One of the most energetic and widely sung Hanuman bhajans, this kirtan-style composition is perfect for group singing (satsang). The fast-paced rhythm mirrors the unstoppable strength of Bajrang Bali. Traditionally sung at the climax of temple pujas and Hanuman Jayanti celebrations.',
    meaningHi: 'सबसे ऊर्जावान और व्यापक रूप से गाए जाने वाले हनुमान भजनों में से एक, यह कीर्तन शैली की रचना समूह गायन के लिए आदर्श है। तेज लय बजरंग बली की अजेय शक्ति को दर्शाती है।',
    lyrics: `जय बजरंग बली, हनुमान महावीर।
संकट मोचन सीताराम, भक्तन के बल-वीर॥

जय जय जय हनुमान गोसाईं।
कृपा करहु गुरुदेव की नाईं॥
जो सत बार पाठ कर कोई।
छूटहिं बंदि महा सुख होई॥

राम काज लगि तव अवतारा।
सुनत महाबीर तव जयकारा॥
संकट से हनुमान छुड़ावे।
मन क्रम बचन ध्यान जो लावे॥

सब पर राम तपस्वी राजा।
तिनके काज सकल तुम साजा॥
और देवता चित्त न धरई।
हनुमत सेइ सर्व सुख करई॥

बोलो हनुमान की जय, बोलो हनुमान की जय।
सीताराम, सीताराम, सीताराम सदा सहाय॥

बजरंग बाण की जय, हनुमान की जय।
लंका-विजेता, राम-दूत महाबली की जय॥
जय बजरंग बली, हनुमान महावीर।
संकट मोचन सीताराम, भक्तन के बल-वीर॥`,
    transliteration: `Jai Bajrang Bali, Hanumaan Mahaveer.
Sankat Mochan Seetaram, Bhaktan Ke Bal-Veer.

Jai Jai Jai Hanumaan Gosaaeen.
Kripa Karahu Gurudev Ki Naaeen.
Jo Sat Baar Paath Kar Koee.
Chhootehin Bandi Mahaa Sukh Hoee.

Ram Kaaj Lagi Tav Avtaara.
Sunat Mahabeer Tav Jaikaaraa.
Sankat Se Hanumaan Chhuddaave.
Man Kram Bachan Dhyaan Jo Laave.

Sab Par Ram Tapaswi Raaja.
Tinke Kaaj Sakal Tum Saaja.
Aur Devata Chitt Na Dharaee.
Hanumat Seyi Sarv Sukh Karaee.

Bolo Hanumaan Ki Jai, Bolo Hanumaan Ki Jai.
Seetaram, Seetaram, Seetaram Sada Sahaay.

Bajrang Baan Ki Jai, Hanumaan Ki Jai.
Lanka-Vijeta, Ram-Doot Mahabali Ki Jai.`,
    youtube: 'https://www.youtube.com/results?search_query=jai+bajrang+bali+hanuman+bhajan',
  },
  {
    id: 4,
    titleHi: 'राम नाम जप ले',
    titleEn: 'Ram Naam Jap Le',
    tradition: 'Folk devotional',
    traditionHi: 'लोक भक्ति',
    mood: 'peaceful',
    occasion: ['daily', 'festivals'],
    firstLine: 'राम नाम जप ले, राम नाम जप ले।',
    meaning: 'A gentle, meditative bhajan that urges the devotee to remember and chant the name of Rama, as Hanuman Ji himself always did. The repetitive, soothing melody makes it perfect for evening prayer and meditation. Hanuman Ji is believed to be eternally present wherever Ram-naam is chanted.',
    meaningHi: 'एक कोमल, ध्यानात्मक भजन जो भक्त को राम का नाम जपने का आग्रह करता है, जैसा कि हनुमान जी स्वयं सदा करते थे। पुनरावृत्ति और शांत धुन इसे संध्या प्रार्थना और ध्यान के लिए उपयुक्त बनाती है।',
    lyrics: `राम नाम जप ले, राम नाम जप ले।
संसार के झंझट में पड़ा है, राम नाम जप ले॥

सुबह शाम राम जपो, रात दिन राम जपो।
मन की मैल धुल जाए, राम नाम जप ले॥

हनुमान के प्रिय राम, सीता के पति राम।
लक्ष्मण के भैया राम, राम नाम जप ले॥

संकट में राम पुकारो, दुख में राम स्मरो।
हर पल राम याद करो, राम नाम जप ले॥

जटायु का उद्धार हुआ, शबरी का उद्धार हुआ।
नाम से तर गए सब जन, राम नाम जप ले॥

अजामिल ने जपा राम, वाल्मीकि ने जपा राम।
पत्थर भी तर गए राम से, राम नाम जप ले॥

मृत्यु के समय काम आए, जीवन में सुख दे जाए।
ऐसा मंत्र है राम का, राम नाम जप ले॥`,
    transliteration: `Ram Naam Jap Le, Ram Naam Jap Le.
Sansaar Ke Jhanjhat Mein Pada Hai, Ram Naam Jap Le.

Subah Shaam Ram Japo, Raat Din Ram Japo.
Man Ki Mail Dhul Jaaye, Ram Naam Jap Le.

Hanumaan Ke Priya Ram, Seeta Ke Pati Ram.
Lakshman Ke Bhaiya Ram, Ram Naam Jap Le.

Sankat Mein Ram Pukaaro, Dukh Mein Ram Smaro.
Har Pal Ram Yaad Karo, Ram Naam Jap Le.

Jatayu Ka Uddhar Hua, Shabari Ka Uddhar Hua.
Naam Se Tar Gaye Sab Jan, Ram Naam Jap Le.

Ajamil Ne Japa Ram, Valmiki Ne Japa Ram.
Patthar Bhi Tar Gaye Ram Se, Ram Naam Jap Le.

Mrityu Ke Samay Kaam Aaye, Jeevan Mein Sukh De Jaaye.
Aisa Mantra Hai Ram Ka, Ram Naam Jap Le.`,
    youtube: 'https://www.youtube.com/results?search_query=ram+naam+jap+le+bhajan',
  },
  {
    id: 5,
    titleHi: 'संकट मोचन नाम तिहारो',
    titleEn: 'Sankat Mochan Naam Tiharo',
    tradition: 'Tulsidas / Classical',
    traditionHi: 'तुलसीदास / शास्त्रीय',
    mood: 'devotional',
    occasion: ['daily', 'tuesday', 'saturday'],
    firstLine: 'संकट मोचन नाम तिहारो।',
    meaning: 'Based on verses from the Ramcharitmanas and the Hanuman Bahuk composed by Tulsidas, this bhajan is sung when one faces deep suffering or illness. Tulsidas composed this when he was afflicted with a painful illness and found relief through devotion to Hanuman Ji. It is one of the most heartfelt compositions in Bhakti literature.',
    meaningHi: 'रामचरितमानस और तुलसीदास रचित हनुमान बाहुक पर आधारित, यह भजन गहरे कष्ट या बीमारी में गाया जाता है। तुलसीदास ने इसे तब रचा था जब वे पीड़ादायक बीमारी से ग्रस्त थे।',
    lyrics: `संकट मोचन नाम तिहारो।
सुमिरत होय आनंद उर हमारो॥

संकट से हनुमान छुड़ावे।
मन क्रम बचन ध्यान जो लावे॥

हे बजरंगी हे महावीर।
मेरे मन में भरो बल गम्भीर॥

राम काज के हो तुम दूत।
लंका जलाई तुम अमित भूत॥

सुग्रीव की सेना में धीर।
तुम हो वीरों में महावीर॥

रोग-शोक दूर करो हनुमान।
भवसागर पार करो भगवान॥

तुलसीदास की विनय सुनो।
संकट मोचन कृपा करो॥

जय बजरंगी जय महाबली।
संकट मोचन नाम तिहारो॥`,
    transliteration: `Sankat Mochan Naam Tihaaro.
Sumират Hoy Aanand Ur Hamaaro.

Sankat Se Hanumaan Chhuddaave.
Man Kram Bachan Dhyaan Jo Laave.

He Bajrangi He Mahaveer.
Mere Man Mein Bharo Bal Gambheer.

Ram Kaaj Ke Ho Tum Doot.
Lanka Jalayi Tum Amit Bhoot.

Sugreev Ki Sena Mein Dheer.
Tum Ho Veeron Mein Mahaveer.

Rog-Shok Dur Karo Hanumaan.
Bhavsagar Paar Karo Bhagwaan.

Tulsidas Ki Vinay Suno.
Sankat Mochan Kripa Karo.

Jai Bajrangi Jai Mahabali.
Sankat Mochan Naam Tihaaro.`,
    youtube: 'https://www.youtube.com/results?search_query=sankat+mochan+naam+tiharo+hanuman+bhajan',
  },
  {
    id: 6,
    titleHi: 'हे दीन दयाल हनुमान',
    titleEn: 'Hey Deen Dayal Hanuman',
    tradition: 'Bhakti / Kirtan',
    traditionHi: 'भक्ति / कीर्तन',
    mood: 'peaceful',
    occasion: ['daily', 'saturday'],
    firstLine: 'हे दीन दयाल हनुमान।',
    meaning: 'A humble, surrendered prayer to Hanuman Ji as the protector of the poor and the helpless. This bhajan is often sung in the evening, when the devotee lays down their worries at the feet of Hanuman Ji. The mood is of quiet surrender and deep trust in divine compassion.',
    meaningHi: 'हनुमान जी को निर्धनों और असहायों के रक्षक के रूप में विनम्र, समर्पित प्रार्थना। यह भजन संध्या में गाया जाता है जब भक्त अपनी सारी चिंताएं हनुमान जी के चरणों में रख देता है।',
    lyrics: `हे दीन दयाल हनुमान।
मेरी पुकार सुनो भगवान॥

मैं हूँ पतित तुम हो उद्धार।
तुम बिन कौन करे स्वीकार॥

राम-नाम का दे दो दान।
हे दीन दयाल हनुमान॥

जब जब संकट आए घेर।
तुम हो मेरे संकट हर॥

विघ्न-बाधा दूर भगाओ।
मन में प्रेम भक्ति जगाओ॥

हे दीन दयाल हनुमान।
मेरी पुकार सुनो भगवान॥

जन्म-जन्म से दास तुम्हारा।
चरण-शरण है आस हमारा॥

कृपा-दृष्टि से मुझे निहारो।
भव-सागर से पार उतारो॥

जय जय जय हनुमान उदार।
हे दीन दयाल हनुमान॥`,
    transliteration: `He Deen Dayaal Hanumaan.
Meri Pukaar Suno Bhagwaan.

Main Hoon Patit Tum Ho Uddhar.
Tum Bin Kaun Kare Sweekar.

Ram-Naam Ka De Do Daan.
He Deen Dayaal Hanumaan.

Jab Jab Sankat Aaye Gher.
Tum Ho Mere Sankat Har.

Vighn-Baadha Door Bhagaao.
Man Mein Prem Bhakti Jagaao.

He Deen Dayaal Hanumaan.
Meri Pukaar Suno Bhagwaan.

Janam-Janam Se Daas Tumhara.
Charan-Sharan Hai Aas Hamaara.

Kripa-Drishti Se Mujhe Nihaaro.
Bhav-Saagar Se Paar Utaaro.

Jai Jai Jai Hanumaan Udaar.
He Deen Dayaal Hanumaan.`,
    youtube: 'https://www.youtube.com/results?search_query=he+deen+dayal+hanuman+bhajan',
  },
  {
    id: 7,
    titleHi: 'मंगल मूरति राम',
    titleEn: 'Mangal Murti Ram',
    tradition: 'Vaishnav Kirtan',
    traditionHi: 'वैष्णव कीर्तन',
    mood: 'devotional',
    occasion: ['daily', 'tuesday', 'festivals'],
    firstLine: 'मंगल मूरति राम, जय सिया राम।',
    meaning: 'A joyous kirtan that celebrates both Rama and his greatest devotee Hanuman Ji together. In Vaishnav tradition, worshipping Hanuman is inseparable from worshipping Rama — Hanuman Ji is the door through which one reaches Rama. This bhajan beautifully weaves both names together in call-and-response style.',
    meaningHi: 'एक आनंदमयी कीर्तन जो राम और उनके महान भक्त हनुमान जी दोनों को एक साथ मनाता है। वैष्णव परंपरा में हनुमान की पूजा राम की पूजा से अभिन्न है।',
    lyrics: `मंगल मूरति राम, जय सिया राम।
हनुमान भक्त अनन्य नाम॥

जय रघुनंदन जय राम।
जानकी वल्लभ सीताराम॥

हनुमान की जय बोलो।
राम नाम की माला लो॥

मंगल मूरति राम, जय सिया राम।
हनुमान भक्त अनन्य नाम॥

राम के दूत वायु के पुत्र।
कपि वर देव न तुमसे सुत्र॥

सीता की खोज की लंका जाय।
राम का काज किया मन लाय॥

मंगल मूरति राम, जय सिया राम।
हनुमान भक्त अनन्य नाम॥

बोलो राम राम राम, सीता राम राम।
हनुमान की जय, जय बजरंग॥

नाम से सब काज बने।
राम-नाम से मुक्ति मिले॥

मंगल मूरति राम, जय सिया राम।
हनुमान भक्त अनन्य नाम॥`,
    transliteration: `Mangal Moorti Ram, Jai Siya Ram.
Hanumaan Bhakt Ananya Naam.

Jai Raghunandan Jai Ram.
Jaanki Vallabh Seetaram.

Hanumaan Ki Jai Bolo.
Ram Naam Ki Maala Lo.

Mangal Moorti Ram, Jai Siya Ram.
Hanumaan Bhakt Ananya Naam.

Ram Ke Doot Vaayu Ke Putra.
Kapi Var Dev Na Tumse Sutra.

Seeta Ki Khoj Ki Lanka Jaay.
Ram Ka Kaaj Kiya Man Laay.

Mangal Moorti Ram, Jai Siya Ram.
Hanumaan Bhakt Ananya Naam.

Bolo Ram Ram Ram, Sita Ram Ram.
Hanumaan Ki Jai, Jai Bajrang.

Naam Se Sab Kaaj Bane.
Ram-Naam Se Mukti Mile.`,
    youtube: 'https://www.youtube.com/results?search_query=mangal+murti+ram+jai+siya+ram+bhajan',
  },
  {
    id: 8,
    titleHi: 'जय हनुमान',
    titleEn: 'Jai Hanuman',
    tradition: 'Classical devotional',
    traditionHi: 'शास्त्रीय भक्ति',
    mood: 'energetic',
    occasion: ['tuesday', 'saturday', 'festivals'],
    firstLine: 'जय हनुमान, जय हनुमान।',
    meaning: 'A powerful, rhythmic bhajan that is traditionally sung at the beginning of puja and at the close of aarti. The repeated chanting of "Jai Hanuman" builds spiritual energy and is believed to dispel negative forces. It is especially effective when chanted in a group setting during festivals and special occasions.',
    meaningHi: 'एक शक्तिशाली, लयबद्ध भजन जो परंपरागत रूप से पूजा की शुरुआत और आरती के अंत में गाया जाता है। "जय हनुमान" के बार-बार उच्चारण से आध्यात्मिक ऊर्जा बनती है और नकारात्मक शक्तियां दूर होती हैं।',
    lyrics: `जय हनुमान, जय हनुमान।
बल बुद्धि विद्या देवहु महान॥

अञ्जनी के लाल, रुद्र अवतार।
राम-दूत वीर अतुलित बल-धार॥

जय हनुमान, जय हनुमान।
बल बुद्धि विद्या देवहु महान॥

केसरी नंदन, वायु-पुत्र वीर।
महाबली महावीर, संकट-भंजन तीर॥

सिंदूर-वदन, ब्रह्मचारी शूर।
राम के भक्त, अज्ञान-तम दूर॥

जय हनुमान, जय हनुमान।
बल बुद्धि विद्या देवहु महान॥

अष्टसिद्धि नौनिधि के दाता।
अस बर दीन्ह जानकी माता॥

राम रसायन तुम्हरे पासा।
सदा रहो रघुपति के दासा॥

जय हनुमान, जय हनुमान।
बल बुद्धि विद्या देवहु महान॥

जय जय जय हनुमान गोसाईं।
कृपा करहु गुरुदेव की नाईं॥`,
    transliteration: `Jai Hanumaan, Jai Hanumaan.
Bal Buddhi Vidya Devahu Mahaan.

Anjani Ke Laal, Rudra Avtaar.
Ram-Doot Veer Atulit Bal-Dhaar.

Jai Hanumaan, Jai Hanumaan.
Bal Buddhi Vidya Devahu Mahaan.

Kesari Nandan, Vaayu-Putra Veer.
Mahabali Mahaveer, Sankat-Bhanjan Teer.

Sindoor-Vadan, Brahmachaari Shoor.
Ram Ke Bhakt, Agyaan-Tam Door.

Jai Hanumaan, Jai Hanumaan.
Bal Buddhi Vidya Devahu Mahaan.

Ashtsiddhi Naunidhi Ke Daata.
As Bar Deenha Jaanki Maata.

Ram Rasayan Tumhare Paasaa.
Sada Raho Raghupati Ke Daasaa.

Jai Hanumaan, Jai Hanumaan.
Bal Buddhi Vidya Devahu Mahaan.

Jai Jai Jai Hanumaan Gosaaeen.
Kripa Karahu Gurudev Ki Naaeen.`,
    youtube: 'https://www.youtube.com/results?search_query=jai+hanuman+bhajan+devotional',
  },
]

const MOODS = [
  { id: 'all', labelEn: 'All', labelHi: 'सभी' },
  { id: 'devotional', labelEn: 'Devotional', labelHi: 'भक्तिमय' },
  { id: 'energetic', labelEn: 'Energetic', labelHi: 'ऊर्जावान' },
  { id: 'peaceful', labelEn: 'Peaceful', labelHi: 'शांतिपूर्ण' },
]

const MOOD_COLORS = {
  devotional: { bg: 'rgba(255,193,7,0.12)', border: 'rgba(255,193,7,0.35)', text: '#ffc107' },
  energetic: { bg: 'rgba(255,107,53,0.12)', border: 'rgba(255,107,53,0.35)', text: '#ff6b35' },
  peaceful: { bg: 'rgba(100,200,255,0.12)', border: 'rgba(100,200,255,0.35)', text: '#64c8ff' },
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MoodTag({ mood, language }) {
  const colors = MOOD_COLORS[mood] || MOOD_COLORS.devotional
  const labels = {
    devotional: { en: 'Devotional', hi: 'भक्तिमय' },
    energetic: { en: 'Energetic', hi: 'ऊर्जावान' },
    peaceful: { en: 'Peaceful', hi: 'शांतिपूर्ण' },
  }
  return (
    <span style={{
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: '20px',
      padding: '0.15rem 0.55rem',
      fontSize: language === 'hi' ? '0.68rem' : '0.58rem',
      color: colors.text,
      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
      letterSpacing: language === 'hi' ? 0 : '0.05em',
      whiteSpace: 'nowrap',
    }}>
      {language === 'hi' ? labels[mood]?.hi : labels[mood]?.en}
    </span>
  )
}

function OccasionTag({ tag, language }) {
  const tagInfo = {
    daily: { en: 'Daily', hi: 'प्रतिदिन', color: '#90e0ef' },
    tuesday: { en: 'Tuesday', hi: 'मंगलवार', color: '#ff9933' },
    saturday: { en: 'Saturday', hi: 'शनिवार', color: '#b0b0ff' },
    festivals: { en: 'Festivals', hi: 'उत्सव', color: '#ffd700' },
  }
  const info = tagInfo[tag]
  if (!info) return null
  return (
    <span style={{
      fontSize: '0.58rem',
      color: info.color,
      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
      opacity: 0.75,
      whiteSpace: 'nowrap',
    }}>
      {language === 'hi' ? info.hi : info.en}
    </span>
  )
}

function BhajanCard({ bhajan, language, index }) {
  const [expanded, setExpanded] = useState(false)
  const [showTranslit, setShowTranslit] = useState(false)
  const t = (en, hi) => language === 'hi' ? hi : en

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.04, 0.25), duration: 0.45 }}
      style={{
        background: 'rgba(18,8,42,0.82)',
        border: '1px solid rgba(255,193,7,0.15)',
        borderRadius: '18px',
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        style={{
          display: 'block', width: '100%', textAlign: 'left',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Index + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.58rem',
                color: 'rgba(201,169,110,0.45)',
                letterSpacing: '0.1em',
                flexShrink: 0,
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 style={{
                fontFamily: 'Noto Sans Devanagari, serif',
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                color: '#ffc107',
                margin: 0,
                lineHeight: 1.3,
              }}>
                {bhajan.titleHi}
              </h3>
            </div>

            {/* English title */}
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.63rem',
              color: 'rgba(201,169,110,0.55)',
              letterSpacing: '0.1em',
              margin: '0 0 0.5rem 2.1rem',
              textTransform: 'uppercase',
            }}>
              {bhajan.titleEn}
            </p>

            {/* Tradition */}
            <p style={{
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
              fontSize: language === 'hi' ? '0.8rem' : '0.72rem',
              color: 'rgba(201,169,110,0.6)',
              margin: '0 0 0.6rem 2.1rem',
            }}>
              {t(bhajan.tradition, bhajan.traditionHi)}
            </p>

            {/* Tags */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
              alignItems: 'center', marginLeft: '2.1rem',
            }}>
              <MoodTag mood={bhajan.mood} language={language} />
              {bhajan.occasion.map((occ) => (
                <OccasionTag key={occ} tag={occ} language={language} />
              ))}
            </div>
          </div>

          {/* Expand chevron */}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'block', color: '#c9a96e',
              fontSize: '0.9rem', flexShrink: 0, marginTop: '0.2rem',
            }}
          >
            ▾
          </motion.span>
        </div>

        {/* First line preview (when collapsed) */}
        {!expanded && (
          <p style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: '0.9rem',
            color: 'rgba(255,248,231,0.45)',
            margin: '0.75rem 0 0',
            fontStyle: 'italic',
            lineHeight: 1.6,
            paddingLeft: '2.1rem',
          }}>
            {bhajan.firstLine}
          </p>
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              borderTop: '1px solid rgba(255,193,7,0.1)',
              padding: '1.5rem',
            }}>
              {/* Special note (for Chalisa) */}
              {bhajan.specialNote && (
                <div style={{
                  background: 'rgba(255,193,7,0.07)',
                  border: '1px solid rgba(255,193,7,0.2)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                }}>
                  <p style={{
                    fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                    fontSize: language === 'hi' ? '0.85rem' : '0.75rem',
                    color: '#ffc107',
                    margin: 0,
                    lineHeight: 1.6,
                  }}>
                    ✦ {t(bhajan.specialNote, bhajan.specialNoteHi)}
                  </p>
                </div>
              )}

              {/* Transliteration toggle */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowTranslit((s) => !s) }}
                  style={{
                    background: showTranslit ? 'rgba(255,193,7,0.12)' : 'transparent',
                    border: `1px solid ${showTranslit ? 'rgba(255,193,7,0.35)' : 'rgba(255,193,7,0.15)'}`,
                    borderRadius: '8px',
                    color: showTranslit ? '#ffc107' : 'rgba(201,169,110,0.5)',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.6rem',
                    padding: '0.3rem 0.7rem',
                    cursor: 'pointer',
                    letterSpacing: '0.07em',
                  }}
                >
                  {t('A→ Roman', 'रोमन लिपि')}
                </button>
              </div>

              {/* Lyrics */}
              {showTranslit ? (
                <pre style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.85rem',
                  color: 'rgba(201,169,110,0.8)',
                  lineHeight: 2,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontStyle: 'italic',
                  letterSpacing: '0.03em',
                  margin: 0,
                  marginBottom: '1.5rem',
                }}>
                  {bhajan.transliteration}
                </pre>
              ) : (
                <pre style={{
                  fontFamily: 'Noto Sans Devanagari, serif',
                  fontSize: 'clamp(1rem, 2.8vw, 1.18rem)',
                  color: '#fff8e7',
                  lineHeight: 2.4,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0,
                  marginBottom: '1.5rem',
                }}>
                  {bhajan.lyrics}
                </pre>
              )}

              {/* Meaning */}
              <div style={{
                background: 'rgba(10,5,21,0.5)',
                borderLeft: '3px solid rgba(255,193,7,0.3)',
                borderRadius: '0 10px 10px 0',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem',
              }}>
                <p style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.58rem',
                  color: '#ffc107',
                  letterSpacing: '0.12em',
                  margin: '0 0 0.5rem',
                }}>
                  {t('MEANING & CONTEXT', 'अर्थ एवं प्रसंग')}
                </p>
                <p style={{
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                  fontSize: language === 'hi' ? '0.95rem' : '0.83rem',
                  color: 'rgba(255,248,231,0.78)',
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  {t(bhajan.meaning, bhajan.meaningHi)}
                </p>
              </div>

              {/* Footer row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  color: 'rgba(201,169,110,0.4)',
                }}>
                  🎵 {t('Play along with any kirtan musician', 'किसी भी कीर्तनकार के साथ गाएं')}
                </span>
                <a
                  href={bhajan.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(255,0,0,0.12)',
                    border: '1px solid rgba(255,0,0,0.3)',
                    borderRadius: '8px',
                    padding: '0.3rem 0.75rem',
                    color: '#ff6b6b',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.07em',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{ fontSize: '0.85rem' }}>▶</span>
                  {t('Watch on YouTube', 'यूट्यूब पर देखें')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function BhajanView() {
  const { language, goBack } = useTempleStore()
  const [activeMood, setActiveMood] = useState('all')
  const t = (en, hi) => language === 'hi' ? hi : en

  const filtered = activeMood === 'all'
    ? BHAJANS
    : BHAJANS.filter((b) => b.mood === activeMood)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 10%, #1a0520 0%, #0a0515 60%)',
        overflowY: 'auto',
      }}
    >
      {/* Sticky header */}
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
        >
          ← {t('Back', 'वापस')}
        </motion.button>

        <span style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
          color: '#ffc107', letterSpacing: language === 'hi' ? 0 : '0.12em',
        }}>
          {t('BHAJAN SANGRAH', 'भजन संग्रह')}
        </span>

        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.68rem',
          color: 'rgba(201,169,110,0.55)',
          letterSpacing: '0.08em',
        }}>
          {filtered.length} {t('bhajans', 'भजन')}
        </span>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem' }}>

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.25))' }} />
            <span style={{ color: 'rgba(255,193,7,0.4)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.25))' }} />
          </div>
          <h1 style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#fff8e7',
            textShadow: '0 2px 24px rgba(255,193,7,0.3)',
            marginBottom: '0.4rem',
            fontWeight: 400,
          }}>
            भजन संग्रह
          </h1>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.62rem',
            color: 'rgba(201,169,110,0.6)',
            letterSpacing: '0.32em',
            marginBottom: '1.25rem',
          }}>
            BHAJAN SANGRAH
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.2))' }} />
            <span style={{ color: 'rgba(255,193,7,0.35)', fontSize: '0.75rem' }}>ॐ</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.2))' }} />
          </div>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.92rem' : '0.78rem',
            color: 'rgba(201,169,110,0.55)',
            maxWidth: '460px',
            margin: '0 auto',
            lineHeight: 1.9,
          }}>
            {t(
              'A collection of sacred bhajans dedicated to Shri Hanuman Ji — from ancient Tulsidas compositions to beloved folk kirtans. Chant along with full lyrics and transliterations.',
              'श्री हनुमान जी को समर्पित पवित्र भजनों का संग्रह — प्राचीन तुलसीदास रचनाओं से लेकर प्रिय लोक कीर्तनों तक।'
            )}
          </p>
        </motion.div>

        {/* Mood filter tabs — underline style */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255,193,7,0.1)',
        }}>
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeMood === mood.id ? '2px solid #ffc107' : '2px solid transparent',
                marginBottom: '-1px',
                padding: '0.55rem 1.1rem',
                color: activeMood === mood.id ? '#ffc107' : 'rgba(201,169,110,0.45)',
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                fontSize: language === 'hi' ? '0.88rem' : '0.62rem',
                letterSpacing: language === 'hi' ? 0 : '0.1em',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {language === 'hi' ? mood.labelHi : mood.labelEn}
            </button>
          ))}
        </div>

        {/* Bhajan cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMood}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {filtered.map((bhajan, i) => (
              <BhajanCard
                key={bhajan.id}
                bhajan={bhajan}
                language={language}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            padding: '1.5rem',
            background: 'rgba(18,8,42,0.5)',
            borderRadius: '14px',
            border: '1px solid rgba(255,193,7,0.08)',
          }}
        >
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
            fontSize: language === 'hi' ? '0.95rem' : '0.72rem',
            color: '#c9a96e',
            letterSpacing: language === 'hi' ? 0 : '0.1em',
            marginBottom: '0.4rem',
          }}>
            {t('॥ जय श्री राम ॥', '॥ जय श्री राम ॥')}
          </p>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.82rem' : '0.72rem',
            color: 'rgba(201,169,110,0.45)',
            margin: 0,
          }}>
            {t(
              'Singing these bhajans on Tuesday and Saturday is especially auspicious. May Hanuman Ji bless you with strength and devotion.',
              'इन भजनों को मंगलवार और शनिवार को गाना विशेष रूप से शुभ है। हनुमान जी आपको शक्ति और भक्ति से आशीर्वाद दें।'
            )}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
