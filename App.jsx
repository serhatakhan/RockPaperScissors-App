import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useState} from 'react';

// Data Import
import {choices} from './src/data/mockData';

// Util Import
import {COLORS} from './src/util/constant';

const App = () => {
  // kullanıcı, pc ve sonuçların her birisini kendileri için oluşturduğumuz state'lerde tut.
  // user ve pc state'lerini birbiriyle karşılaştırıp bir result belirle onu da result state'inde tut.
  const [userChoice, setUserChoice] = useState(null);
  const [compoterChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  // KULLANICININ SEÇİMİ state'de tutuldu.
  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);

    // user'ın yaptığı seçimi, pc'nin yaptığı seçime yolla.
    randomComputerChoice(userChoice);
  };

  // PC'NİN YAPACAĞI SEÇİM
  const randomComputerChoice = userChoice => {
    // rastgele sayı üret
    const randomIndex = Math.floor(Math.random() * choices.length);

    // pc'ye sayı tahmin ettir (pc'nin seçimi)
    const computerChoice = choices[randomIndex];

    // pc'nin seçimini state'i aktar, (state güncellendi)
    setComputerChoice(computerChoice);

    // determineWinner fonk oluştur ve user ile computer'in seçimlerini al ve karşılaştır
    determineWinner(userChoice, computerChoice);
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult('BERABERE...');
    } else if (
      (user?.name === 'Taş' && computer?.name === 'Makas') ||
      (user?.name === 'Kağıt' && computer?.name === 'Taş') ||
      (user?.name === 'Makas' && computer?.name === 'Kağıt')
    ) {
      setResult('KAZANDIN!');
    } else {
      setResult("KAYBETTİN :((")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* statusbar ile üst çentik kısmındaki tarih ve saatin rengini değiştir */}
      <StatusBar barStyle={'light-content'} />

      <View style={styles.container}>
        <Text style={styles.title}>Taş Kağıt Makas</Text>
        <Text style={styles.choiceText}>Seçimini yap:</Text>
        <View style={styles.choices}>
          {/* choices'u map ile dön ve tıklanabilir şekilde listele. */}
          {/* tıklanınca efektif bir görüntü olması için TouchableOpacity kullan. */}
          {choices?.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={choice?.name === userChoice?.name ? [styles.button, styles.activeButton] : styles.button}
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {/* compoterChoice varsa render et. çünkü compoterChoice'ın başlangıç değeri null */}
        {compoterChoice && (
          <>
            <Text style={styles.choiceText}>Bilgisayarın Seçimi:</Text>
            <View style={styles.button}>
              <Image source={compoterChoice?.image} style={styles.image} />
            </View>
          </>
        )}
        {/* && den sonra () paratez içiyle başlayan bir return satırı olduğu için tek bir kapsayıcısı olmalı. */}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  choiceText: {
    marginVertical: 20,
    fontSize: 22,
    color: COLORS.white,
  },
  choices: {
    // display: "flex", --> zaten varsayılan olarak geldiği için yazmaya gerek yok
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  image: {
    width: 92,
    height: 92,
  },
  button: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
  resultText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 24,
    color: COLORS.blue,
  },
  activeButton:{
    borderWidth: 4,
    borderColor: "red"
  }
});
