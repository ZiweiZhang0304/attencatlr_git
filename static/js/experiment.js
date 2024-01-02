const PROLIFIC_CODE = 'CMESJVF1'  // set this to the prolific completion code to run in prolific mode

async function initializeExperiment() {
  LOG_DEBUG('initializeExperiment');

  ///////////
  // Setup //
  ///////////

  // Functions are in utils.js

  // trials = await $.getJSON 'static/json/rewards/increasing.json'
  // To avoid repeating ourselves,  we create a variable for a piece
  // of html that we use multiple times.
  var anykey = "<div class='lower message'>Press any key to continue.</div>";


  /////////////////////////////
  // Category Learning Setup //
  /////////////////////////////

  // Read in category condition .xlsx file into JSON
  var full_boundary     = [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170];
  var image_number      = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];

  // Shuffle category boundary
  var shape_boundary = getRandom(full_boundary,1)[0]; //boundary_number for shape
  var color_boundary = getRandom(full_boundary,1)[0]; //boundary_number for color
  console.log(shape_boundary);
  console.log(color_boundary);

  image_catergory_assignment = function(boundary_number) {
    category_list = new Object();

    if (boundary_number == 0) {
      category_A = list_of_num_range(1,9);
      category_A = category_A.concat(list_of_num_range(28,36));

      category_B = list_of_num_range(10,27);
    }
    else if (boundary_number == 10) {
      category_A = list_of_num_range(1,8);
      category_A = category_A.concat(list_of_num_range(27,36));

      category_B = list_of_num_range(9,26);
    }
    else if (boundary_number == 20) {
      category_A = list_of_num_range(1,7);
      category_A = category_A.concat(list_of_num_range(26,36));

      category_B = list_of_num_range(8,25);
    }
    else if (boundary_number == 30) {
      category_A = list_of_num_range(1,6);
      category_A = category_A.concat(list_of_num_range(25,36));

      category_B = list_of_num_range(7,24);
    }
    else if (boundary_number == 40) {
      category_A = list_of_num_range(1,5);
      category_A = category_A.concat(list_of_num_range(24,36));

      category_B = list_of_num_range(6,23);
    }
    else if (boundary_number == 50) {
      category_A = list_of_num_range(1,4);
      category_A = category_A.concat(list_of_num_range(23,36));

      category_B = list_of_num_range(5,22);
    }
    else if (boundary_number == 60) {
      category_A = list_of_num_range(1,3);
      category_A = category_A.concat(list_of_num_range(22,36));

      category_B = list_of_num_range(4,21);
    }
    else if (boundary_number == 70) {
      category_A = list_of_num_range(1,2);
      category_A = category_A.concat(list_of_num_range(21,36));

      category_B = list_of_num_range(3,20);
    }
    else if (boundary_number == 80) {
      category_A = list_of_num_range(1,1);
      category_A = category_A.concat(list_of_num_range(20,36));

      category_B = list_of_num_range(2,19);
    }
    else if (boundary_number == 90) {
      category_A = list_of_num_range(19,36);

      category_B = list_of_num_range(1,18);
    }
    else if (boundary_number == 100) {
      category_A = list_of_num_range(18,35);

      category_B = list_of_num_range(1,17);
      category_B = category_B.concat(list_of_num_range(36,36));
    }
    else if (boundary_number == 110) {
      category_A = list_of_num_range(17,34);

      category_B = list_of_num_range(1,16);
      category_B = category_B.concat(list_of_num_range(35,36));
    }
    else if (boundary_number == 120) {
      category_A = list_of_num_range(16,33);

      category_B = list_of_num_range(1,15);
      category_B = category_B.concat(list_of_num_range(34,36));
    }
    else if (boundary_number == 130) {
      category_A = list_of_num_range(15,32);

      category_B = list_of_num_range(1,14);
      category_B = category_B.concat(list_of_num_range(33,36));
    }
    else if (boundary_number == 140) {
      category_A = list_of_num_range(14,31);

      category_B = list_of_num_range(1,13);
      category_B = category_B.concat(list_of_num_range(32,36));
    }
    else if (boundary_number == 150) {
      category_A = list_of_num_range(13,30);

      category_B = list_of_num_range(1,12);
      category_B = category_B.concat(list_of_num_range(31,36));
    }
    else if (boundary_number == 160) {
      category_A = list_of_num_range(12,29);

      category_B = list_of_num_range(1,11);
      category_B = category_B.concat(list_of_num_range(30,36));
    }
    else if (boundary_number == 170) {
      category_A = list_of_num_range(11,28);

      category_B = list_of_num_range(1,10);
      category_B = category_B.concat(list_of_num_range(29,36));
    }
    category_list.category_A = category_A;
    category_list.category_B = category_B;

    return category_list;
  };

  var shape_catergory_assignment = image_catergory_assignment(shape_boundary);
  var color_catergory_assignment = image_catergory_assignment(color_boundary);
  console.log(shape_catergory_assignment);
  console.log(color_catergory_assignment); 
  

  // Shuffle whether odd or even numbers are learning
  var shape_learn_test = getRandom([0,1],1)[0]; //if 0, then learning given to [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]; if 1, then learning given to [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]
  var color_learn_test = getRandom([0,1],1)[0]; //if 0, then learning given to [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]; if 1, then learning given to [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]
  console.log(shape_learn_test);
  console.log(color_learn_test);


  image_learn_test_assignment = function(learn_test_number) {
    
    learn_test_list = new Object();
    if (learn_test_number == 0){ //even learning
        var learning = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]
        var testing  = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]
    } else {
      var testing = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]
      var learning  = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]
    }
    learn_test_list.learning = learning;
    learn_test_list.testing = testing;

    return learn_test_list
  }

  var shape_learn_test_assignment = image_learn_test_assignment(shape_learn_test);
  var color_learn_test_assignment = image_learn_test_assignment(color_learn_test);


  //motor response
  var CR_rand = shuffle([0,1]);
  var CR1_idx = CR_rand[0];
  var CR2_idx = CR_rand[1];
  var resp = ['f','j']; //if 0, Group_A is f, Group_B is j; if 1, Group_A is j, Group_B is f;
  var CR1 = resp[CR1_idx];
  var CR2 = resp[CR2_idx];
  console.log(CR1, typeof CR1);

  // Category Learning Stimuli
  var stim_color = [
  'static/images/test_stim/color/01_b.png',
  'static/images/test_stim/color/02_b.png',
  'static/images/test_stim/color/03_b.png',
  'static/images/test_stim/color/04_b.png',
  'static/images/test_stim/color/05_b.png',
  'static/images/test_stim/color/06_b.png',
  'static/images/test_stim/color/07_b.png',
  'static/images/test_stim/color/08_b.png',
  'static/images/test_stim/color/09_b.png',
  'static/images/test_stim/color/10_b.png',
  'static/images/test_stim/color/11_b.png',
  'static/images/test_stim/color/12_b.png',
  'static/images/test_stim/color/13_b.png',
  'static/images/test_stim/color/14_b.png',
  'static/images/test_stim/color/15_b.png',
  'static/images/test_stim/color/16_b.png',
  'static/images/test_stim/color/17_b.png',
  'static/images/test_stim/color/18_b.png',
  'static/images/test_stim/color/19_b.png',
  'static/images/test_stim/color/20_b.png',
  'static/images/test_stim/color/21_b.png',
  'static/images/test_stim/color/22_b.png',
  'static/images/test_stim/color/23_b.png',
  'static/images/test_stim/color/24_b.png',
  'static/images/test_stim/color/25_b.png',
  'static/images/test_stim/color/26_b.png',
  'static/images/test_stim/color/27_b.png',
  'static/images/test_stim/color/28_b.png',
  'static/images/test_stim/color/29_b.png',
  'static/images/test_stim/color/30_b.png',
  'static/images/test_stim/color/31_b.png',
  'static/images/test_stim/color/32_b.png',
  'static/images/test_stim/color/33_b.png',
  'static/images/test_stim/color/34_b.png',
  'static/images/test_stim/color/35_b.png',
  'static/images/test_stim/color/36_b.png'
];

var stim_shape = [
  'static/images/test_stim/shape/001_b.png',
  'static/images/test_stim/shape/011_b.png',
  'static/images/test_stim/shape/021_b.png',
  'static/images/test_stim/shape/031_b.png',
  'static/images/test_stim/shape/041_b.png',
  'static/images/test_stim/shape/051_b.png',
  'static/images/test_stim/shape/061_b.png',
  'static/images/test_stim/shape/071_b.png',
  'static/images/test_stim/shape/081_b.png',
  'static/images/test_stim/shape/091_b.png',
  'static/images/test_stim/shape/101_b.png',
  'static/images/test_stim/shape/111_b.png',
  'static/images/test_stim/shape/121_b.png',
  'static/images/test_stim/shape/131_b.png',
  'static/images/test_stim/shape/141_b.png',
  'static/images/test_stim/shape/151_b.png',
  'static/images/test_stim/shape/161_b.png',
  'static/images/test_stim/shape/171_b.png',
  'static/images/test_stim/shape/181_b.png',
  'static/images/test_stim/shape/191_b.png',
  'static/images/test_stim/shape/201_b.png',
  'static/images/test_stim/shape/211_b.png',
  'static/images/test_stim/shape/221_b.png',
  'static/images/test_stim/shape/231_b.png',
  'static/images/test_stim/shape/241_b.png',
  'static/images/test_stim/shape/251_b.png',
  'static/images/test_stim/shape/261_b.png',
  'static/images/test_stim/shape/271_b.png',
  'static/images/test_stim/shape/281_b.png',
  'static/images/test_stim/shape/291_b.png',
  'static/images/test_stim/shape/301_b.png',
  'static/images/test_stim/shape/311_b.png',
  'static/images/test_stim/shape/321_b.png',
  'static/images/test_stim/shape/331_b.png',
  'static/images/test_stim/shape/341_b.png',
  'static/images/test_stim/shape/351_b.png'
];

  var stim_color_g = [];
  for (j = 0; j < stim_color.length; j++) {
      var color_g = color_rep(stim_color[j],33);
      stim_color_g.push(color_g);
  };

  var stim_shape_g = [];
  for (j = 0; j < stim_shape.length; j++) {
      var shape_g = shape_rep(stim_shape[j],34);
      stim_shape_g.push(shape_g);
  };


  /////////////////////////////////////
  //// Attention CPT Stimuli Setup ////
  /////////////////////////////////////
  var full_sitmuli_preload = [
  "static/images/test_stim/CPT_fractal/image00_b.png", "static/images/test_stim/CPT_fractal/image00_g.png",
  "static/images/test_stim/CPT_fractal/image01_b.png", "static/images/test_stim/CPT_fractal/image01_g.png",
  "static/images/test_stim/CPT_fractal/image02_b.png", "static/images/test_stim/CPT_fractal/image02_g.png",
  "static/images/test_stim/CPT_fractal/image03_b.png", "static/images/test_stim/CPT_fractal/image03_g.png",
  "static/images/test_stim/CPT_fractal/image04_b.png", "static/images/test_stim/CPT_fractal/image04_g.png",
  "static/images/test_stim/CPT_fractal/image05_b.png", "static/images/test_stim/CPT_fractal/image05_g.png",
  "static/images/test_stim/CPT_fractal/image06_b.png", "static/images/test_stim/CPT_fractal/image06_g.png",
  "static/images/test_stim/CPT_fractal/image07_b.png", "static/images/test_stim/CPT_fractal/image07_g.png",
  "static/images/test_stim/CPT_fractal/image08_b.png", "static/images/test_stim/CPT_fractal/image08_g.png",
  "static/images/test_stim/CPT_fractal/image09_b.png", "static/images/test_stim/CPT_fractal/image09_g.png",
  "static/images/test_stim/CPT_fractal/image10_b.png", "static/images/test_stim/CPT_fractal/image10_g.png",
  "static/images/test_stim/CPT_fractal/image11_b.png", "static/images/test_stim/CPT_fractal/image11_g.png"
  ];

  var full_stimuli_list = [
  "static/images/test_stim/CPT_fractal/image00_b.png",
  "static/images/test_stim/CPT_fractal/image01_b.png",
  "static/images/test_stim/CPT_fractal/image02_b.png",
  "static/images/test_stim/CPT_fractal/image03_b.png",
  "static/images/test_stim/CPT_fractal/image04_b.png",
  "static/images/test_stim/CPT_fractal/image05_b.png",
  "static/images/test_stim/CPT_fractal/image06_b.png",
  "static/images/test_stim/CPT_fractal/image07_b.png",
  "static/images/test_stim/CPT_fractal/image08_b.png",
  "static/images/test_stim/CPT_fractal/image09_b.png",
  "static/images/test_stim/CPT_fractal/image10_b.png",
  "static/images/test_stim/CPT_fractal/image11_b.png"
  ];
  
  //randomly select non-trigger frequent shapes
  var frequent_nontrigger = getRandom(full_stimuli_list,11);

  //one left out as non-trigger infrequent shape
  var infrequent_target = full_stimuli_list.filter(function(val) {
    return frequent_nontrigger.indexOf(val) == -1;
  });
  console.log(infrequent_target, "this is infrequent target shape")
  
  //1200 total trials, 1080 frequent trials, 1080/11(shapes) = 98*11 + 2
  frequent_repetition = []
  for (i = 0; i < frequent_nontrigger.length; i++) {
    frequent_repetition.push(Array(98).fill(frequent_nontrigger[i])) //98*11
  };

  frequent_repetition = frequent_repetition.flat();
  frequent_repetition = frequent_repetition.concat(getRandom(frequent_nontrigger,2)); // +2
  console.log(frequent_repetition,frequent_repetition.length)

  

  infrequent_repetition = []
  for (i = 0; i < infrequent_target.length; i++) {
      infrequent_repetition.push(Array(120).fill(infrequent_target[i]))
  };
  infrequent_repetition = infrequent_repetition.flat()
  console.log(infrequent_repetition,infrequent_repetition.length)
  
  frequent_repetition = shuffle(frequent_repetition)
  infrequent_repetition = shuffle(infrequent_repetition)
  //console.log(infrequent_repetition,infrequent_repetition.length)
  


  //////////////////
  // Instructions //
  //////////////////

  var welcome_block = {
    type: "html-keyboard-response",
    // We use the handy markdown function (defined in utils.js) to format our text.
    stimulus: markdown(`
    # Category Learning Experiment

    Welcome! In this experiment, you will learn to categorize a group of colors and shapes. You
    will see a series of images and make judgements. We will provide feedback
    to help you learn!

    ${anykey}
    `)

  };

//   var slider_rotate_trial = {
//     type: "slider-rotate",
//     stimulus: 'static/images/test_stim/shape/wheel_shape.png',
//     min: 0,
//     max: 360,
//     //labels: ['happy', 'sad'],
//     prompt: "<p>Please indicate the boundary of the category!</p>",
//     require_movement: true
// };


  /* -----Instructions----- */
  var instructions_block_01 = {
    type: 'instructions',
    pages: [
        /* -----instr_1----- */
        '<p style="color:black;font-size:26px">\n' +
        '        Please take a few minutes to read the instructions carefully. <br>\n' +
        '        <br>\n' +
        '        This is a three-part experiment. We will now go through the instructions for the first part. <br>\n' +
        '\n' +
        '    </p>',
  
       /* -----instr_2----- */
        '<p style="color:black;font-size:26px">\n' +
        '        In the first part, you will see different shapes.  <br>\n' +
        '         <br>\n' +
        '        Some shapes will appear very frequently, like these: <br>\n' +
        '    </p>\n' +
        '        <br>\n' +
        '    <p>\n' +
        " <img src=' " + frequent_nontrigger[0] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[1] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[2] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[3] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[4] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[5] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[6] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[7] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[8] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[9] + "'" + "width='120' height='120' " + " />" +
        " <img src=' " + frequent_nontrigger[10] + "'" + "width='120' height='120' " + " />" +
        '        <br>\n' +
        '    </p>\n' +
        '        <br>\n' +
        '    </p>',
  
        /* -----instr_3----- */
        '    <p style="color:black;font-size:26px">\n' +
        '        However, occasionally, you will a RARE shape that look like these: <br>\n' +
        '    </p>\n' +
  
        '        <br>\n' +
  
        '    <p>\n' +
        " <img src=' " + infrequent_target + "'" + "width='120' height='120' " + " />" +
        '\n' +
        '        <br>\n' +
        '    </p>\n' +
  
        '        <br>\n' +
  
        '    <p style="color:black;font-size:26px">\n' +
        '        Do NOT press any keys when you encounter this shape. <br>\n' +
        '         And PRESS THE SPACEBAR to all the o ther shapes. <br>\n' +
        '        <br>\n' +
        '        The shapes will go by quickly so you should pay attention to them. <br>\n' +
        '\n' +
        '    </p>',
  
        /* -----instr_4----- */
        '<p style="color:black;font-size:26px">\n' +
        '    Now you will do a short practice of this part of the experiment. <br>\n' +
        '        <br>\n' +
        '    Note that you will see feedback on your performance during this practice but not during the real experiment. <br>\n'+
        '        <br>\n' +
        '    Now, click on ‘next’ to start the practice. <br>\n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
  };



  //////////////////
  /////// ITI //////
  //////////////////
var iti_200 = {
  type: "image-keyboard-response",
  stimulus: "static/images/test_stim/CPT_fractal/iti/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 200,
};


  /////////////////////////////////////
  //// Attention CPT Trial Setup ////
  /////////////////////////////////////

/* ----- Selecting Stim for Practice ----- */
var infrequent_repetition_prac = infrequent_repetition.slice(0, 2);
console.log(infrequent_repetition_prac)
var frequent_repetition_prac = frequent_repetition.slice(0, 8);
console.log(frequent_repetition_prac)

var prac_stimuli = []
for (i = 0; i < infrequent_repetition_prac.length; i++) {
  frequent_repetition_prac.splice(Math.floor((Math.random() * frequent_repetition_prac.length)), 0, infrequent_repetition_prac[i]);
}
console.log(frequent_repetition_prac);

var prac_stimuli = []
for (j = 0; j < frequent_repetition_prac.length; j++) {
    var stimuli_prac = new Object();
    stimuli_prac.at_stimulus_prac = frequent_repetition_prac[j];

    stimuli_prac.data = new Object();


    if (frequent_nontrigger.includes(stimuli_prac.at_stimulus_prac)) {
        stimuli_prac.data.at_TrialType = 'frequent';
        stimuli_prac.data.correct_response = 'space';
        stimuli_prac.at_fix = CPT_fre_rep(stimuli_prac.at_stimulus_prac,44);
    } else {
        stimuli_prac.data.at_TrialType = 'infrequent';
        stimuli_prac.data.correct_response = '';
        stimuli_prac.at_fix = CPT_fre_rep(stimuli_prac.at_stimulus_prac,44);
    }


    stimuli_prac.data.test_part = 'prac';
    stimuli_prac.data.TaskType = 'prac';
    prac_stimuli.push(stimuli_prac);
};

/* ----- Creating Prac Trials ----- */
var prac = {
  timeline: [
      {
          type: "image-keyboard-response",
          stimulus:jsPsych.timelineVariable('at_stimulus_prac'),
          choices: ['space'],
          data: jsPsych.timelineVariable('data'),
          trial_duration: 800,
          on_finish: function (data) {
              data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
          }
      },

      {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('at_fix'),
          choices: jsPsych.NO_KEYS,
          response_ends_trial: false,
          trial_duration:function(data) {
                  if (jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).select('rt').values[0] == null) {
                      var fix_duration = 0
                  } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).select('rt').values[0]); };
                  return fix_duration
              }
      }],
};

var prac_feedback = {
  type: 'html-keyboard-response',
  stimulus: function () {
      var last_trial_correct = jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).values()[0].correct;
      if (last_trial_correct) {
          return "<p style='color:black;font-size:40px;'> <b>Correct!</b> </p>"
      } else {
          return "<p style='color:black;font-size:40px;'> <b>Incorrect!</b> </p>"
      }
  },
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};

var prac_block = {
  timeline: [prac, prac_feedback, iti_200],
  timeline_variables: prac_stimuli,
  randomize_order: false,
  repetitions: 1
}


var debrief = {
  type: "html-keyboard-response",
  stimulus: function () {

      var trials = jsPsych.data.get().filter({ test_part: 'prac' });
      var correct_trials = trials.filter({ correct: true });
      var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
      return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
          "<p>Remember that you should respond as accurately as possible. Press any key to move on.</p>";

  }
};

/* ----- Selecting Main CPT Stimuli ----- */

  /* ----- Selecting Stim for First 3 Trials ----- */
  var first3_stimuli = []
  var repetition_first3 = frequent_repetition.slice(0, 3);
  
  for (j = 0; j < repetition_first3.length; j++) {
      var stimuli_first3 = new Object();
      stimuli_first3.at_stimulus_first3 = repetition_first3[j];
  
      stimuli_first3.data = new Object();
  
  
      if (frequent_nontrigger.includes(stimuli_first3.at_stimulus_first3)) {
          stimuli_first3.data.at_TrialType = 'frequent';
          stimuli_first3.data.correct_response = 'space';
          stimuli_first3.at_fix = CPT_fre_rep(stimuli_first3.at_stimulus_first3,44);
      } else {
          stimuli_first3.data.at_TrialType = 'infrequent';
          stimuli_first3.data.correct_response = '';
          stimuli_first3.at_fix = CPT_fre_rep(stimuli_first3.at_stimulus_first3,44);
      }
      
  
      stimuli_first3.data.test_part = 'test';
      stimuli_first3.data.TaskType = 'at';
      first3_stimuli.push(stimuli_first3);
  };

  
  /* ----- Selecting Stim for after the First 3 Trials ----- */
var infrequent_repetition_attention = infrequent_repetition.slice(0, 12); //120
var frequent_repetition_attention = frequent_repetition.slice(3, 108); //1080
console.log(infrequent_repetition_attention, frequent_repetition_attention)

var at_stimuli = []
for (i = 0; i < infrequent_repetition_attention.length; i++) {
    frequent_repetition_attention.splice(Math.floor((Math.random() * frequent_repetition_attention.length)), 0, infrequent_repetition_attention[i]);
};

/* -----attention task stimuli----- */
for (j = 0; j < frequent_repetition_attention.length; j++) {
    var stimuli = new Object();
    stimuli.at_stimulus = frequent_repetition_attention[j];

    stimuli.data = new Object();


    if (frequent_nontrigger.includes(stimuli.at_stimulus)) {
        stimuli.data.at_TrialType = 'frequent';
        stimuli.data.correct_response = 'space';
        stimuli.at_fix = CPT_fre_rep(stimuli.at_stimulus,44);
    } else {
        stimuli.data.at_TrialType = 'infrequent';
        stimuli.data.correct_response = '';
        stimuli.at_fix = CPT_fre_rep(stimuli.at_stimulus,44);
    }


    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'at';
    at_stimuli.push(stimuli);
}
//console.log(at_stimuli)



/* ----- First 3 trials should not have infrequent -----*/
var lr_node = false;

var attention_first3 = {
  timeline:[
      {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('at_stimulus_first3'),
          choices: ['space'],
          data: jsPsych.timelineVariable('data'),
          trial_duration: 800,
          on_finish: function (data) {

              var at_counter = jsPsych.data.get().filter({TaskType: 'at'}).select('rt').values.length

              data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
              var rt_mean = jsPsych.data.get().filter({test_part: 'test',at_TrialType: 'frequent', key_press: 32}).select('rt').mean(); //if you change response key, don't forget to search for key code
              var rt_sd = jsPsych.data.get().filter({test_part: 'test', at_TrialType: 'frequent', key_press: 32}).select('rt').sd();

              data.at_counter = at_counter

              data.at_RunningMean = rt_mean
              data.sd = rt_sd
              data.slow = rt_mean +  rt_sd
              data.fast = rt_mean - rt_sd
          }
      },


{type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration: function (data) {
        if (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0] == null) {
            var fix_duration = 0
        } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0]); };
        return fix_duration
    }
}
],
};

var first3_block = {
    timeline: [attention_first3 , iti_200],
    timeline_variables: first3_stimuli,
    randomize_order: false,
    repetitions: 1
}


/* -----After the 3rd trial-----*/

var attention = {
  timeline:[
  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_stimulus'),
  choices: ['space'],
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){

    var at_counter = jsPsych.data.get().filter({TaskType: 'at'}).select('rt').values.length
    var slow_lr_counter = jsPsych.data.get().filter({diff: 'slow'}).select('rt').values.length
    var fast_lr_counter = jsPsych.data.get().filter({diff: 'fast'}).select('rt').values.length
    var lr_counter = slow_lr_counter + fast_lr_counter


    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var rt_mean = jsPsych.data.get().filter({ at_TrialType: 'frequent', key_press: 32}).select('rt').mean(); //if you change response key, don't forget to search for key code
    var rt_sd = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).select('rt').sd();

    data.at_RunningMean = rt_mean
    data.sd = rt_sd
    data.slow = rt_mean + rt_sd
    data.fast = rt_mean - rt_sd


    data.at_counter = at_counter

    data.slow_lr_counter = slow_lr_counter
    data.fast_lr_counter = fast_lr_counter
    data.lr_counter = lr_counter
    console.log('ATTENTION!!! there are ' + at_counter + ' attention trials. KEEP GOING!!!')
    console.log('there are' + lr_counter + ' learning trials')
    console.log('there are' + fast_lr_counter + ' fast learning trials')
    console.log('there are' + slow_lr_counter + ' slow learning trials')
    lr_node = false


    if (at_counter > 3) {
        /* ---- Restriction 1 starts here ---- */ 
        //see if the last trial was an infrequent trial
        var last_infreq = jsPsych.data.get().filter({TaskType: 'at'}).last(3).select('at_TrialType').values;
        if (last_infreq.includes('infrequent') == true) {
        console.log('there is an infreq')}

        /* ---- Restriction 2 starts here ---- */ 
        //see if there was an error in the last 3 trials
        var last_correct = jsPsych.data.get().filter({ TaskType: 'at' }).last(3).select('correct').values;
        console.log(last_correct)
        if (last_correct.includes(false) == true){
        console.log('there is an error')}

        var last_rt = jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(3).select('rt').values;

        for (var i = 0; i<3; i++){
         if (last_rt[i] <100) {
           last_rt[i] = true
            }
        };
        if (last_rt.includes(true)) {
         console.log('too fast')};

        /* ---- Restriction 3 starts here ---- */  
        var last_lr = jsPsych.data.get().filter({ test_part: 'test' }).last(3).select('TaskType').values;
        if (last_lr.includes('learning')== true) {
            console.log('there is a trig trial')}

        /* ---- Calculate trailing RT after the third trial ---- */ 
        var last_three_choices = jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(3).select('rt').values;
        console.log(last_three_choices, last_three_choices.length);
        if (last_three_choices.every(element => element === null)) {
        var rt_three = NaN;
      } else if (last_three_choices.some(element => element == null)) {
        null_ind_list = []
        for ( var i = 0; i < last_three_choices.length; i++ ) {
            if ( last_three_choices[i] !== null ) {
              null_ind_list.push(i)
        
              var rt_not_null = null_ind_list.map(i => last_three_choices[i]);
              var rt_three = rt_not_null.reduce((a,b) => a + b, 0) / rt_not_null.length
    }
}
      }
      else {
          var rt_three = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).last(3).select('rt').mean();
        }



        data.at_TrailingMean = rt_three
        console.log('trailing mean is ' + rt_three)

        //console.log(jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0])

  };

    /* ---- Restriction 3 starts here ---- */
    //restriction 1 where the last three trials were all fast/slow then the next one can't be the same: || last_fast == false || last_slow == false
    if (at_counter > 8 && lr_counter > 0){ //change 80
        console.log('----new restriction 1 starts here----')

        /* ---- count learning trials ---- */
        //see if the last 3 learning trials were all fast, if so the next one can't be fast
        if (fast_lr_counter >=3 ) {
            var last_lr_fast = jsPsych.data.get().filter({ diff: 'fast' }).last(3).select('lr_counter').values;
            console.log(last_lr_fast)
            console.log('learning trial counter for fast trials: ' + last_lr_fast)
            console.log('max for last fast trials: ' + Math.max(...last_lr_fast), Math.max(...last_lr_fast)+1)


            // if learning trial numbers are not consecutive, it means that they are not in a 3 cluster,
            if (isConsecutive(last_lr_fast)) {
                if (lr_counter == Math.max(...last_lr_fast) + 1) {
                    last_fast = false}
                else (last_fast = true)
            } else {
                last_fast = true
            }
            console.log('can we trigger fast next? ' + last_fast)
        } else {
            console.log('less than 3 fast trials');
            last_fast = true
        }


        //see if the last 3 learning trials were all slow, if so the next one can't be slow
        if (slow_lr_counter >=3 ) {
            var last_lr_slow = jsPsych.data.get().filter({diff: 'slow'}).last(3).select('lr_counter').values;
            console.log(last_lr_slow)
            console.log('lr_counter for slow trials: ' + last_lr_slow)
            console.log('max for last slow trials: ' + Math.max(...last_lr_slow), Math.max(...last_lr_slow)+1)

            // if learning trial numbers are not consecutive, it means that they are not in a 3 cluster,
            if (isConsecutive(last_lr_slow)) {
                if (lr_counter == Math.max(...last_lr_slow) + 1) {
                    last_slow = false}
                else (last_slow = true)
            } else {
                last_slow = true
            }
        console.log('can we trigger slow next? ' + last_slow)
        } else {
            console.log('less than 3 slow trials');
            last_slow = true
        }

    /* ---- Restriction 4 starts here ---- */    
    if (fast_lr_counter >0 && slow_lr_counter >0){
        //see if fast - slow is greater than 3, if so the next one can't be fast; or if slow - fast is greater than 5, if so the next one can't be slow

      console.log('fast_counter' + fast_lr_counter + 'slow_counter' + slow_lr_counter)
      if ((fast_lr_counter - slow_lr_counter) >=3 )
                {diff_restrict_fast = false}
      else if ((slow_lr_counter - fast_lr_counter) >=3)
                {diff_restrict_slow = false}
      else { diff_restrict_slow = true
             diff_restrict_fast = true
          console.log('diff is smaller than 3') }
        }
    };

    /* ---- Restriction 5 starts here ---- */   
    //in first 6 trials, 3 fast 3 slow: ||initial_slow == false || initial_fast == false
    if ( 0< lr_counter && lr_counter <= 6 ) {
        // check how many fast and how many slow have already been encountered
        console.log('here is initial learning trial: ' + lr_counter)
        var initial = jsPsych.data.get().filter({ test_part: 'test' }).select('diff').values

        var initial_fast_count = countItems(initial, 'fast')
        var initial_slow_count = countItems(initial, 'slow')

        // if there's 0, 1, 2 slow, slow can happen; if there's 3 slow, then don't trigger even reaching a slow threshold
        if (initial_fast_count < 3) {
            initial_fast = true
        } else {
            initial_fast = false
        }

        // if there's 0, 1, 2 fast, fast can happen; if there's 3 fast, then don't trigger even reaching a fast threshold
        if (initial_slow_count < 3) {
            initial_slow = true
        } else {
            initial_slow = false
        };

      }  else {console.log('no learning yet or more than 6 learning trials')};



    /*---- Start applying restrictions to triggering ----*/
    /*-- If attention <= 80 --*/
    if (at_counter < 8) { //change 80
        lr_node = false
        filler_node = false
    }

    else if (at_counter > 8 && lr_counter > 0 && lr_counter < 6){ //change 80

      /*-- If attention > 80 && 0< learning <=6 --*/
      if(rt_three > rt_mean+ rt_sd && initial_slow == true && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('learning') ==false)
      {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < rt_mean- rt_sd && initial_fast == true && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('learning') ==false)
          {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
      }


    else if (at_counter > 8 && lr_counter >= 6){ //change 80

      /*-- If attention > 80 && learning > 6 --*/
      if(rt_three > rt_mean+ rt_sd && last_slow == true && diff_restrict_slow != false && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('learning') ==false)
      {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < rt_mean- rt_sd && last_fast == true && diff_restrict_fast != false && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('learning') ==false)
          {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
  }


    /*-- If attention > 80 && learning = 0 --*/
    else if (at_counter > 8 && lr_counter == 0) { //change 80

        if(rt_three > rt_mean+ rt_sd && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('learning') ==false) {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < rt_mean- rt_sd && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('learning') ==false) {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
        };

    },
  trial_duration: 800
  },


{type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration: function (data) {
        if (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0] == null) {
            var fix_duration = 0
        } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0]); };
        return fix_duration
        }
    }
    ],
};



  /////////////////////////////
  // Learning stimuli setup //
  ////////////////////////////

  // Create learning stimuli list
  number_to_index = function(list) {
    var list_idx = [];
    for (let i=0 ; i < list.length ; i++){
      list_idx[i] = list[i] - 1
    }
    return list_idx
  }

  stim_shape_GA_idx = number_to_index(shape_catergory_assignment.category_A);
  stim_shape_GB_idx = number_to_index(shape_catergory_assignment.category_B);
  stim_color_GA_idx = number_to_index(color_catergory_assignment.category_A);
  stim_color_GB_idx = number_to_index(color_catergory_assignment.category_B);

  stim_shape_L_idx  = number_to_index(shape_learn_test_assignment.learning);
  stim_shape_T_idx  = number_to_index(shape_learn_test_assignment.testing);
  stim_color_L_idx  = number_to_index(color_learn_test_assignment.learning);
  stim_color_T_idx  = number_to_index(color_learn_test_assignment.testing);

  stim_shape_GA     = stim_shape_GA_idx.map(x=>stim_shape[x]);
  stim_shape_GB     = stim_shape_GB_idx.map(x=>stim_shape[x]);
  stim_color_GA     = stim_color_GA_idx.map(x=>stim_color[x]);
  stim_color_GB     = stim_color_GB_idx.map(x=>stim_color[x]);

  stim_shape_L      = stim_shape_L_idx.map(x=>stim_shape[x]);
  stim_shape_T      = stim_shape_T_idx.map(x=>stim_shape[x]);
  stim_color_L      = stim_color_L_idx.map(x=>stim_color[x]);
  stim_color_T      = stim_color_T_idx.map(x=>stim_color[x]);
  


  var learning_stimuli_shape = []  
  var attention_state_list = shuffle(['fast', 'slow']);

  for (j = 0; j < stim_shape_L.length; j++) {
    var learning_stimuli = new Object();

    learning_stimuli.stimulus = stim_shape_L[j]; 
    console.log(stim_shape_L[j]);

    learning_stimuli.data = new Object();

    if (stim_shape_GA.includes(learning_stimuli.stimulus)) {
        learning_stimuli.data.set = 'shape';
        learning_stimuli.data.category = 'Group_A';
        learning_stimuli.data.correct_response = CR1;
        learning_stimuli.data.boundary = shape_boundary;
        learning_stimuli.data.feedback_num = shape_learn_test;
        learning_stimuli.postresp = shape_rep(learning_stimuli.stimulus,34);
        learning_stimuli.data.attention_state = attention_state_list[0];

    } else if (stim_shape_GB.includes(learning_stimuli.stimulus)) {
        learning_stimuli.data.set = 'shape';
        learning_stimuli.data.category = 'Group_B';
        learning_stimuli.data.correct_response = CR2;
        learning_stimuli.data.boundary = shape_boundary;
        learning_stimuli.data.feedback_num = shape_learn_test;
        learning_stimuli.postresp = shape_rep(learning_stimuli.stimulus,34);
        learning_stimuli.data.attention_state = attention_state_list[0];

    } else {
        console.log('not in any of the cats, might be something wrong.')
    }

    //learning_stimuli.data.test_part = 'test';
    learning_stimuli.data.TaskType = 'learning';
    learning_stimuli.data.StimType = 'learned_stim';
    learning_stimuli.data.repsonse_cont = CR_rand;
    learning_stimuli_shape.push(learning_stimuli);
};



  var learning_stimuli_color = []
  for (j = 0; j < stim_color_L.length; j++) {
    var learning_stimuli = new Object();

    learning_stimuli.stimulus = stim_color_L[j]; 
    console.log(stim_color_L[j]);

    learning_stimuli.data = new Object();

    if (stim_color_GA.includes(learning_stimuli.stimulus)) {
        learning_stimuli.data.set = 'color';
        learning_stimuli.data.category = 'Group_A';
        learning_stimuli.data.correct_response = CR1;
        learning_stimuli.data.boundary = color_boundary;
        learning_stimuli.data.feedback_num = color_learn_test;
        learning_stimuli.postresp = color_rep(learning_stimuli.stimulus,33);
        learning_stimuli.data.attention_state = attention_state_list[1];

    } else if (stim_color_GB.includes(learning_stimuli.stimulus)) {
        learning_stimuli.data.set = 'color';
        learning_stimuli.data.category = 'Group_B';
        learning_stimuli.data.correct_response = CR2;
        learning_stimuli.data.boundary = color_boundary;
        learning_stimuli.data.feedback_num = color_learn_test;
        learning_stimuli.postresp = color_rep(learning_stimuli.stimulus,33);
        learning_stimuli.data.attention_state = attention_state_list[1];

    } else {
        console.log('not in any of the cats, might be something wrong.')
    }

    //learning_stimuli.at_fix = rep(stimuli_first3.at_stimulus_first3);

    //learning_stimuli.data.test_part = 'test';
    learning_stimuli.data.TaskType = 'learning';
    learning_stimuli.data.StimType = 'learned_stim';
    learning_stimuli.data.repsonse_cont = CR_rand;
    learning_stimuli_color.push(learning_stimuli);
};
console.log(learning_stimuli_shape);
console.log(learning_stimuli_color);
  


  ///////////////////////////////////
  // Learning trials presentation //
  //////////////////////////////////
  var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="margin-top:-50%; font-size:40px;">+</div>',  //'<div style="margin-top: 90px; font-size:60px;">+</div>'
    choices: jsPsych.NO_KEYS,
    trial_duration() {
      return Math.floor(Math.random() * 200) + 800  //Math.floor(Math.random() * 200) + 800
    },
  }

  var learning_trial = {
    timeline:[
    {type: "image-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f','j'],
    stimulus_height: 10,
    stimulus_width: 10,
    data: jsPsych.timelineVariable('data'),
    trial_duration: 2400,
    on_finish: function (data) {
        var check_convert = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
        console.log(check_convert);
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
      }
  },
    {type: "image-keyboard-response",
      stimulus: jsPsych.timelineVariable('postresp'),
      choices: jsPsych.NO_KEYS,
      response_ends_trial: false,
      trial_duration:function(data) {
              if (jsPsych.data.get().filter({ TaskType: 'learning' }).last(1).select('rt').values[0] == null) {
                  var fix_duration = 0
              } else { var fix_duration = 2400 - (jsPsych.data.get().filter({ TaskType: 'learning' }).last(1).select('rt').values[0]); };
              return fix_duration
          }
      }]
  };


  /* define feedback trials */
  var feedback = {
    type: "html-keyboard-response", //"image-keyboard-response"
    stimulus: function(){
      var last_trial_correct = jsPsych.data.get().filter({TaskType: 'learning'}).last(1).values()[0].correct;
      if(last_trial_correct){
        return "<p style='color:black;font-size:40px;'> <b>Correct!</b> </p>";//repo_site + 'test_stim/correct.png'
      } else {
        return "<p style='color:black;font-size:40px;'> <b>Incorrect!</b> </p>";//repo_site + 'test_stim/incorrect.png'
      }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1600
  };


  /* define learning procedure */
  var learning_procedure_color = {
    timeline: [learning_trial],
    timeline_variables: learning_stimuli_color,
    // randomize_order: true,
    // repetitions: 6
    sample: {
      type: 'with-replacement',
      size: 1,
    },
      randomize_order: true,
      repetitions: 1
  };

  var learning_procedure_shape = {
    timeline: [learning_trial], //[fixation, learning_trial, feedback]
    timeline_variables: learning_stimuli_shape,
    // randomize_order: true,
    // repetitions: 6
    sample: {
      type: 'with-replacement',
      size: 1,
    },
      randomize_order: true,
      repetitions: 1
  };

//// UNCOMMENTED

var learning_color = {
  timeline: [fixation, learning_procedure_color, feedback],
  randomize_order: false,
  repetitions: 1
};

var learning_shape = {
  timeline: [fixation, learning_procedure_shape, feedback],
  randomize_order: false,
  repetitions: 1
};

if (learning_stimuli_color[0].data.attention_state == 'fast') {
  var fast_lr = learning_color
  var slow_lr = learning_shape
} else {
  var slow_lr = learning_color
  var fast_lr = learning_shape};

var if_node_1= { //slow node
timeline: [slow_lr],
conditional_function: function(data){
  if (lr_node == 1){
    return true;
  } else {return false}
}
};

var if_node_2= { //fast node
timeline: [fast_lr],
conditional_function: function(data){
  if (lr_node == 2){
    return true;
  } else{return false}
}
};

var at_test_procedure = {
  timeline: [iti_200,attention,if_node_1,if_node_2,iti_200], //[attention,iti_200]
  timeline_variables: at_stimuli,
  randomize_order: false,
  repetitions: 1
}


  /////////////////////////////
  // Test Category Learning //
  ////////////////////////////

  var instruction_testing = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        The shapes and colors you learned in the first part of the study were grouped into categories. <br>\n' +
        '        <br>\n' +
        '        Therefore, in this section, we will ask you to indicate what you think the categories are. <br>\n' +
        '        <br>\n' +
        '        Now, click on "Next" to move on. <br> \n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}

  //Testing

  var testing_stimuli_shape = []  
  console.log(stim_shape_T)
  var stim_shape_T_shuffled = shuffle(stim_shape_T)
  console.log(stim_shape_T_shuffled)
  for (j = 0; j < stim_shape_T_shuffled.length; j++) {
    var testing_stimuli = new Object();

    testing_stimuli.stimulus = stim_shape_T_shuffled[j]; 
    console.log(stim_shape_T_shuffled[j]);

    testing_stimuli.data = new Object();

    if (stim_shape_GA.includes(testing_stimuli.stimulus)) {
        testing_stimuli.data.set = 'shape';
        testing_stimuli.data.category = 'Group_A';
        testing_stimuli.data.correct_response = CR1;
        testing_stimuli.data.boundary = shape_boundary;
        testing_stimuli.data.feedback_num = shape_learn_test;
        testing_stimuli.postresp = shape_rep(testing_stimuli.stimulus,34);
        testing_stimuli.data.attention_state = attention_state_list[0];

    } else if (stim_shape_GB.includes(testing_stimuli.stimulus)) {
        testing_stimuli.data.set = 'shape';
        testing_stimuli.data.category = 'Group_B';
        testing_stimuli.data.correct_response = CR2;
        testing_stimuli.data.boundary = shape_boundary;
        testing_stimuli.data.feedback_num = shape_learn_test;
        testing_stimuli.postresp = shape_rep(testing_stimuli.stimulus,34);
        testing_stimuli.data.attention_state = attention_state_list[0];

    } else {
        console.log('not in any of the cats, might be something wrong.')
    }

    //testing_stimuli.at_fix = rep(stimuli_first3.at_stimulus_first3);

    //testing_stimuli.data.test_part = 'test';
    testing_stimuli.data.TaskType = 'testing';
    testing_stimuli.data.StimType = 'tested_stim';
    testing_stimuli.data.repsonse_cont = CR_rand;
    testing_stimuli_shape.push(testing_stimuli);
};
console.log(testing_stimuli_shape);

  var testing_stimuli_color = []
  var stim_color_T_shuffled = shuffle(stim_color_T)

  for (j = 0; j < stim_color_T_shuffled.length; j++) {
    var testing_stimuli = new Object();

    testing_stimuli.stimulus = stim_color_T_shuffled[j]; 
    console.log(stim_color_T_shuffled[j]);

    testing_stimuli.data = new Object();

    if (stim_color_GA.includes(testing_stimuli.stimulus)) {
        testing_stimuli.data.set = 'color';
        testing_stimuli.data.category = 'Group_A';
        testing_stimuli.data.correct_response = CR1;
        testing_stimuli.data.boundary = color_boundary;
        testing_stimuli.data.feedback_num = color_learn_test;
        testing_stimuli.postresp = color_rep(testing_stimuli.stimulus,33);
        testing_stimuli.data.attention_state = attention_state_list[0];

    } else if (stim_color_GB.includes(testing_stimuli.stimulus)) {
        testing_stimuli.data.set = 'color';
        testing_stimuli.data.category = 'Group_B';
        testing_stimuli.data.correct_response = CR2;
        testing_stimuli.data.boundary = color_boundary;
        testing_stimuli.data.feedback_num = color_learn_test;
        testing_stimuli.postresp = color_rep(testing_stimuli.stimulus,33);
        testing_stimuli.data.attention_state = attention_state_list[0];

    } else {
        console.log('not in any of the cats, might be something wrong.')
    }

    //testing_stimuli.at_fix = rep(stimuli_first3.at_stimulus_first3);

    testing_stimuli.data.TaskType = 'testing';
    testing_stimuli.data.StimType = 'tested_stim';
    testing_stimuli.data.repsonse_cont = CR_rand;
    testing_stimuli_color.push(testing_stimuli);
};

// shuffle which category gets tested first
var test_order = getRandom([0,1],1)[0];
if (test_order == 0) {
  var testing_stimuli_all = testing_stimuli_color.concat(testing_stimuli_shape);
} else {
  var testing_stimuli_all = testing_stimuli_shape.concat(testing_stimuli_color);
}
        

  /* define testing trials */
  var testing = {
      timeline: [
    {type: "image-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f','j'],
    data: jsPsych.timelineVariable('data'),
    trial_duration: 2400,
    on_finish: function (data) {
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    }},
    {type: "image-keyboard-response",
      stimulus: jsPsych.timelineVariable('postresp'),
      choices: jsPsych.NO_KEYS,
      response_ends_trial: false,
      trial_duration:function(data) {
              if (jsPsych.data.get().filter({ TaskType: 'testing' }).last(1).select('rt').values[0] == null) {
                  var fix_duration = 0
              } else { var fix_duration = 2400 - (jsPsych.data.get().filter({ TaskType: 'testing' }).last(1).select('rt').values[0]); };
              return fix_duration
          }
    }]
  };
  /* define testing procedure */
  // var testing_procedure_shape = {
  //   timeline: [fixation, testing],
  //   timeline_variables: testing_stimuli_shape
  // };
  // var testing_procedure_color = {
  //   timeline: [fixation, testing],
  //   timeline_variables: testing_stimuli_color
  // };

  var testing_procedure = {
    timeline: [fixation, testing],
    timeline_variables: testing_stimuli_all
  };

  

  /////////////////////////
  ////// Drag & Drop //////
  /////////////////////////
  var instruction_d_d = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        The shapes and colors you learned in the first part of the study were grouped into categories. <br>\n' +
        '        <br>\n' +
        '        Therefore, in this section, we will ask you to indicate what you think the categories are by having you drag and drop. <br>\n' +
        '        <br>\n' +
        '        Now, click on "Next" to move on. <br> \n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}



// var sorting_stimuli= [];
// var lr_triplet_full = lr_triplet_1.concat(lr_triplet_2)
// for (var i = 0; i < lr_triplet_full.length; i++) {
//     sorting_stimuli.push(repo_site + lr_triplet_full[i]);
// }
// console.log(sorting_stimuli);

// var sort_trial_1 = {
//     type: 'free-sort',
//     stimuli: sorting_stimuli.slice(0,3),
//     prompt: '<p>Drag the 3 shapes outside of the box and drop them below in the order that you remember seeing them during the first part of the experiment.<br>  Place the shape that you remember seeing first to the left, the shape you remember seeing second in the middle, and the shape that you remember seeing third to the right. <br> When you drag and drop the three shapes, you should make sure that there are space in between them in the box.</p>',
//     stim_height: 50,
//     stim_width: 50,
//     scale_factor: 2,
//     border_width: 2,
//     sort_area_shape: "square",
//     stim_starts_inside:false,
//     sort_area_height: 100,
//     sort_area_width: 300,
//     column_spread_factor: 1.5,
//     on_finish: function (data) {
//         data.test_part = 'post_drag'
//     }

// };





  /////////////////////////
  // Experiment timeline //
  /////////////////////////

  // `timeline` determines the high-level structure of the
  // experiment. When developing the experiment, you
  // can comment out blocks you aren't working on
  // so you don't have to click through them to test
  // the section you're working on.
  
  // This ensures that images appear exactly when we tell them to.
  var pre_load_list = stim_color.concat(stim_shape, stim_color_g, stim_shape_g,full_sitmuli_preload);
  jsPsych.pluginAPI.preloadImages(pre_load_list);

  var timeline = [
    //welcome_block,
    //slider_rotate_trial,
    instructions_block_01,
    //prac_block,
    //debrief,
    first3_block,
    at_test_procedure,
    //instruction5,
    //learning_procedure,
    //instruction_testing,
    testing_procedure
    //sort_trial_1
  ];

  if (searchParams.get('skip') != null) {
    timeline.splice(0, parseInt(searchParams.get('skip')))
  }


  return startExperiment({
    timeline,
    exclusions: {
      min_width: 800,
      min_height: 600
    },
  });
};
