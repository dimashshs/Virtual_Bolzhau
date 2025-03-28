'use client';
export default function ModelInfo() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 pt-20">
      <div className="text-center mb-12">
        <h5 className="text-primary-gradient font-medium text-xl">Модельдер туралы</h5>
        <h1 className="text-3xl font-bold">Үздік ерекшеліктер</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {/* Keras моделі */}
        <div className="feature-item bg-light rounded-lg p-6 transition-transform transform hover:scale-105 shadow-md hover:shadow-xl">
          <div className="flex items-center justify-center bg-secondary-gradient rounded-full mb-4" style={{ width: '60px', height: '60px' }}>
            <i className="fa fa-layer-group text-white fs-4"></i>
          </div>
          <h5 className="text-xl font-semibold mb-3">Keras моделі</h5>
          <p className="text-sm mb-4">
            Бұл модель символдарды болжайды және фразаларды аяқтайды.
          </p>
          <ul className="text-left text-sm">
            <li><strong>Алгоритм:</strong> LSTM негізіндегі рекуррентті нейрондық желі.</li>
            <li><strong>Оқу әдісі:</strong> 40 символдан тұратын тізбек арқылы оқытылады.</li>
            <li><strong>Тестілеу:</strong> Оқытылмаған мәтіндермен тексеріледі.</li>
          </ul>
        </div>

        {/* Биграммды модель */}
        <div className="feature-item bg-light rounded-lg p-6 transition-transform transform hover:scale-105 shadow-md hover:shadow-xl">
          <div className="flex items-center justify-center bg-primary-gradient rounded-full mb-4" style={{ width: '60px', height: '60px' }}>
            <i className="fa fa-eye text-white fs-4"></i>
          </div>
          <h5 className="text-xl font-semibold mb-3">Биграммды модель</h5>
          <p className="text-sm mb-4">
            Бұл модель сөздердің жұптарын талдайды және келесі сөзді болжайды.
          </p>
          <ul className="text-left text-sm">
            <li><strong>Алгоритм:</strong> Статистикалық әдіс негізінде биграммаларды қолданады.</li>
            <li><strong>Оқу әдісі:</strong> Мәтін корпусында биграммалардың жиіліктері есептеледі.</li>
            <li><strong>Тестілеу:</strong> Модель түрлі мәтіндерде тестіленді.</li>
          </ul>
        </div>

        {/* Триграммды модель */}
        <div className="feature-item bg-light rounded-lg p-6 transition-transform transform hover:scale-105 shadow-md hover:shadow-xl">
          <div className="flex items-center justify-center bg-primary-gradient rounded-full mb-4" style={{ width: '60px', height: '60px' }}>
            <i className="fa fa-edit text-white fs-4"></i>
          </div>
          <h5 className="text-xl font-semibold mb-3">Триграммды модель</h5>
          <p className="text-sm mb-4">
            Бұл модель үш сөздің тізбегін талдайды және келесі сөзді болжайды.
          </p>
          <ul className="text-left text-sm">
            <li><strong>Алгоритм:</strong> Үш сөздің ықтималдығын есептейді.</li>
            <li><strong>Оқу әдісі:</strong> Үлкен мәтін корпусында триграммаларды есептеу.</li>
            <li><strong>Тестілеу:</strong> Әртүрлі жанрларда тестіленді.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
