export const topicOfTheWeek = {
  week: 1,
  title: "Binary Search & Monotonic Predicates",
  publicationDate: "November 15, 2026",
  contributors: "Jayraj Rathi, Aadarsh Nichit, Siddharth Chiplunkar",
  status: "Active Topic",
  difficulty: "Fundamental to Intermediate",
  estimatedTime: "6–8 Hours Practice",
  shortDescription:
    "Master interval reduction, discrete predicate testing check(mid), and binary decision spaces for contest-level problems.",

  introduction:
    "Binary Search is fundamentally not just an algorithm for finding an element in a sorted array—it is a general technique for identifying a boundary or answer in any monotonic search space. Whenever a condition check(x) transitions predictably (such as from false to true), the candidate search space can be halved on every iteration, reducing linear or massive searches up to 10¹⁸ into O(log N) or O(log(range)) operations.",

  introductionPoints: [
    {
      title: "Binary Search on Sorted Arrays",
      description: "Direct interval bisection on contiguous indexed memory to locate exact target values or verify non-existence in O(log N) time."
    },
    {
      title: "Lower Bound & Upper Bound",
      description: "Locating the first position satisfying A[i] ≥ target (lower_bound) or A[i] > target (upper_bound). The difference between these positions directly computes range occurrence frequency in O(log N)."
    },
    {
      title: "Binary Search on a Monotonic Predicate",
      description: "Evaluating any boolean function check(x) that transitions monotonically across the domain (e.g. FFF...TTT). We search for the exact boundary where the transition occurs."
    },
    {
      title: "Binary Search on the Answer (Minimax / Feasibility)",
      description: "Converting an optimization objective (e.g. \"minimize the maximum latency\" or \"maximize minimum distance\") into a decision check (\"is answer X feasible?\"), enabling greedy or linear checks to find optimal values."
    },
    {
      title: "Predicate Acceleration via Auxiliary Structures",
      description: "Using prefix sums, greedy scans, or two pointers inside check(mid) to evaluate feasibility in O(N) or O(1), keeping overall runtime strictly logarithmic over the answer space."
    },
    {
      title: "Monotonicity as the Invariant Condition",
      description: "Monotonicity is the indispensable mathematical condition. Correct implementations depend on maintaining the search invariant, defining interval boundaries carefully [low, high], preventing 32-bit integer overflow with mid = low + (high - low)/2, and proving the interval shrinks on every step."
    }
  ],

  motivation:
    "Mastering Binary Search is fundamental for competitive programming success on Codeforces, AtCoder, and ICPC contests:",

  motivationPoints: [
    {
      title: "Exponential Search Space Reduction",
      description: "Reduces search from linear O(N) to logarithmic O(log N). A search space of 10¹⁸ values is reduced to a single answer in fewer than 60 evaluations (log₂(10¹⁸) ≈ 60)."
    },
    {
      title: "Ubiquitous in Contest Problem Architectures",
      description: "Appears across array tasks, geometric continuous coordinates, capacity scheduling, flow networks, and dynamic programming optimizations."
    },
    {
      title: "Combinatorial Power with Other Techniques",
      description: "Binary search achieves peak contest potency when combined with sorting, prefix sums, greedy checks, and coordinate compression."
    },
    {
      title: "Recognizing Monotonicity is the True Skill",
      description: "The core algorithmic competency is not writing the while-loop, but recognizing when the answer space is monotonic and formulating an efficient check(mid) predicate."
    }
  ],

  prerequisites: [
    {
      name: "C++ Fundamentals",
      description: "Comfortable with variables, loops, conditionals, functions, vectors, and standard I/O (cin/cout with fast I/O). Binary Search is simple to code once the loop and its state variables are understood."
    },
    {
      name: "Arrays, Sorting & Iterators",
      description: "Understanding vector indexing and sorted order. Standard binary search relies fundamentally on sortedness; iterators (begin()/end()) are essential for C++ STL algorithms."
    },
    {
      name: "Time Complexity & Logarithmic Growth",
      description: "Understanding the difference between O(N) linear time and O(log N) bisection, where each iteration discards half the candidate range."
    },
    {
      name: "Basic Problem-Solving & Conditions",
      description: "Translating problem statements into conditions and checking edge cases. Structuring a separate modular feasibility decision check(mid)."
    },
    {
      name: "Prefix Sums & Greedy Reasoning (Supporting)",
      description: "Useful supporting concepts for intermediate problems when check(mid) requires constant-time range queries or greedy scans. Not mandatory for basic search."
    }
  ],

  conceptsAndPatterns: [
    {
      id: "bs-sorted-array",
      title: "Binary Search & STL Bounds",
      summary: "Direct interval bisection in O(log N) using lower_bound and upper_bound on sorted contiguous memory."
    },
    {
      id: "bs-monotonic-predicate",
      title: "Monotonic Feasibility Predicates",
      summary: "Evaluating boolean condition check(mid) transitioning monotonically (FFFF...TTTT) across a discrete domain."
    },
    {
      id: "bs-answer-space",
      title: "Binary Search on Answer Space",
      summary: "Converting minimax optimization problems into feasibility checks over numerical and continuous ranges."
    }
  ],

  learningResources: [
    {
      category: "A. Binary Search Fundamentals",
      intro:
        "Foundational guides covering interval bisection principles, loop invariants, boundary definitions [low, high], continuous search, and preventing integer overflow.",
      items: [
        {
          title: "Binary Search",
          platform: "CP-Algorithms",
          url: "https://cp-algorithms.com/num_methods/binary_search.html",
          type: "Core Guide",
          description:
            "Authoritative reference covering sorted-array search, arbitrary monotonic predicates, continuous search, and powers-of-two bisection optimization."
        },
        {
          title: "Binary Search (Silver)",
          platform: "USACO Guide",
          url: "https://usaco.guide/silver/binary-search",
          type: "Structured Guide",
          description:
            "Structured competitive programming module explaining search invariants, interval definitions, monotonic predicates, and interactive problem ladders."
        },
        {
          title: "Two Pointers Method & Binary Search (Course 2)",
          platform: "Codeforces EDU",
          url: "https://codeforces.com/edu/course/2",
          type: "Interactive Course",
          description:
            "Official ITMO Academy interactive curriculum featuring step-by-step video lectures, basic array search, answer optimization, and real-number precision problems."
        }
      ]
    },
    {
      category: "B. C++ STL: lower_bound, upper_bound, and binary_search",
      intro:
        "Notice the crucial differences in return semantics: std::lower_bound returns an iterator to the first element not less than (≥) target, std::upper_bound returns an iterator to the first element strictly greater than (>) target, and std::binary_search performs boolean existence testing (returns true/false). In competitive programming, lower_bound and upper_bound are preferred because iterator arithmetic (upper_bound - lower_bound) directly computes element frequencies in O(log N).",
      items: [
        {
          title: "std::lower_bound",
          platform: "cppreference.com",
          url: "https://en.cppreference.com/w/cpp/algorithm/lower_bound",
          type: "STL Reference",
          description:
            "Locates the first iterator position whose element is not less than (≥) a given value in a sorted range."
        },
        {
          title: "std::upper_bound",
          platform: "cppreference.com",
          url: "https://en.cppreference.com/w/cpp/algorithm/upper_bound",
          type: "STL Reference",
          description:
            "Locates the first iterator position strictly greater than (>) a value, enabling O(log N) range frequency queries via iterator subtraction."
        },
        {
          title: "std::binary_search",
          platform: "cppreference.com",
          url: "https://en.cppreference.com/w/cpp/algorithm/binary_search",
          type: "STL Reference",
          description:
            "Performs logarithmic boolean existence testing on a sorted range, returning true if an equivalent element exists."
        }
      ]
    },
    {
      category: "C. Prefix Sums and Efficient Feasibility Checks",
      intro:
        "Prefix sums precompute cumulative array totals in O(N) time, enabling any contiguous range sum query to execute in O(1). While not required for simple array search, prefix sums frequently accelerate feasibility checks in Binary Search on the answer when validating subarray sums, averages, or segment lengths against candidate thresholds.",
      items: [
        {
          title: "Prefix Sums (Silver)",
          platform: "USACO Guide",
          url: "https://usaco.guide/silver/prefix-sums",
          type: "Technique Guide",
          description:
            "Detailed guide covering 1D and 2D prefix sums and constant-time subsegment querying used inside contest feasibility functions."
        }
      ]
    },
    {
      category: "D. Monotonicity and Binary Search on the Answer",
      intro:
        "A boolean predicate P(x) is monotonic if its truth value changes in only one direction across the candidate domain (e.g. false, false, ..., true, true). This structural invariant ensures that whenever check(mid) is true, all candidates to one side are also valid, allowing the algorithm to safely discard half the domain. This technique transforms difficult optimization questions ('minimize the maximum') into straightforward feasibility checks.",
      items: [
        {
          title: "Monotonic Predicates & Answer-Space Binary Search",
          platform: "CP-Algorithms",
          url: "https://cp-algorithms.com/num_methods/binary_search.html",
          type: "Theory & Practice",
          description:
            "Explains how to formulate check(mid) predicates and mathematically prove that the candidate search space can safely be halved at each iteration."
        },
        {
          title: "Binary Search on the Answer Walkthrough",
          platform: "USACO Guide",
          url: "https://usaco.guide/silver/binary-search",
          type: "Contest Guide",
          description:
            "Covers classic minimax contest patterns (e.g. Angry Cows, Convention) with step-by-step problem explanations and editorial code."
        }
      ]
    }
  ],

  problemSet: [
    // Easy Tier: Foundations & Invariants
    {
      id: "p1",
      categories: ["two-pointers"],
      name: "Two Sum II - Input Array Is Sorted",
      platform: "LeetCode 167",
      problemUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Two Pointers", "Sorted Array", "Binary Search"],
      hint: "Since the array is sorted, if sum < target, increasing left pointer guarantees a larger sum. If sum > target, decreasing right pointer guarantees a smaller sum.",
      editorialUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/editorial/"
    },
    {
      id: "p2",
      categories: ["sliding-window"],
      name: "Maximum Average Subarray I",
      platform: "LeetCode 643",
      problemUrl: "https://leetcode.com/problems/maximum-average-subarray-i/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Fixed Sliding Window", "Prefix State"],
      hint: "Compute the sum of the first k elements. Then slide rightward one element at a time: add nums[i] and subtract nums[i - k].",
      editorialUrl: "https://leetcode.com/problems/maximum-average-subarray-i/editorial/"
    },
    {
      id: "p3",
      categories: ["binary-search"],
      name: "Binary Search",
      platform: "LeetCode 704",
      problemUrl: "https://leetcode.com/problems/binary-search/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Binary Search", "Foundations"],
      hint: "Use mid = low + (high - low) / 2 to prevent 32-bit integer overflow.",
      editorialUrl: "https://leetcode.com/problems/binary-search/editorial/"
    },
    {
      id: "p4",
      categories: ["two-pointers"],
      name: "Sereja and Dima",
      platform: "Codeforces 381A",
      problemUrl: "https://codeforces.com/problemset/problem/381/A",
      difficulty: "800",
      difficultyTier: "Easy",
      tags: ["Two Pointers", "Greedy"],
      hint: "Both players greedily pick max(cards[l], cards[r]). Maintain left and right index pointers until l > r.",
      editorialUrl: "https://codeforces.com/blog/entry/10363"
    },

    // Medium Tier: Standard Applications & Variations
    {
      id: "p5",
      categories: ["sliding-window"],
      name: "Subarray Product Less Than K",
      platform: "LeetCode 713",
      problemUrl: "https://leetcode.com/problems/subarray-product-less-than-k/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Variable Sliding Window", "Monotonicity"],
      hint: "Expand the right pointer multiplying into running product. If product >= k, divide by nums[left] and increment left. Number of new valid subarrays ending at right is (right - left + 1).",
      editorialUrl: "https://leetcode.com/problems/subarray-product-less-than-k/editorial/"
    },
    {
      id: "p6",
      categories: ["two-pointers", "sliding-window"],
      name: "Books",
      platform: "Codeforces 279B",
      problemUrl: "https://codeforces.com/problemset/problem/279/B",
      difficulty: "1400",
      difficultyTier: "Medium",
      tags: ["Two Pointers", "Sliding Window"],
      hint: "Find the maximum length contiguous subsegment whose sum does not exceed total available time t.",
      editorialUrl: "https://codeforces.com/blog/entry/6915"
    },
    {
      id: "p7",
      categories: ["sliding-window"],
      name: "Longest Repeating Character Replacement",
      platform: "LeetCode 424",
      problemUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Sliding Window", "Frequency Table"],
      hint: "A window is valid if (window length - maximum character frequency) <= k. Maintain max frequency dynamically.",
      editorialUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/editorial/"
    },
    {
      id: "p8",
      categories: ["binary-search"],
      name: "Aggressive Cows",
      platform: "SPOJ AGGRCOW",
      problemUrl: "https://www.spoj.com/problems/AGGRCOW/",
      difficulty: "Classic",
      difficultyTier: "Medium",
      tags: ["Binary Search on Answer", "Greedy Check"],
      hint: "Binary search on distance d in [1, stalls[n-1] - stalls[0]]. check(d) greedily assigns cows at stalls at least d units apart.",
      editorialUrl: "https://cp-algorithms.com/"
    },
    {
      id: "p9",
      categories: ["binary-search"],
      name: "Koko Eating Bananas",
      platform: "LeetCode 875",
      problemUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary Search on Answer"],
      hint: "Check speed mid. Compute sum(ceil(pile / mid)). If total hours <= h, high = mid - 1; otherwise low = mid + 1.",
      editorialUrl: "https://leetcode.com/problems/koko-eating-bananas/editorial/"
    },
    {
      id: "p10",
      categories: ["sliding-window"],
      name: "Maximum Beauty of an Array After Operation",
      platform: "LeetCode 2779",
      problemUrl: "https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Sort", "Sliding Window"],
      hint: "Sort the array. Two elements nums[i] and nums[j] can be equalized if nums[j] - nums[i] <= 2 * k. Find the largest valid window.",
      editorialUrl: "https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/editorial/"
    },

    // Hard Tier: Advanced Applications & Combined Concepts
    {
      id: "p11",
      categories: ["two-pointers", "sliding-window"],
      name: "Minimum Window Substring",
      platform: "LeetCode 76",
      problemUrl: "https://leetcode.com/problems/minimum-window-substring/",
      difficulty: "Hard",
      difficultyTier: "Hard",
      tags: ["Sliding Window", "Two Pointers", "Hash Map"],
      hint: "Track remaining character counts needed from target string t. Use a counter for distinct required characters matched to verify feasibility in O(1).",
      editorialUrl: "https://leetcode.com/problems/minimum-window-substring/editorial/"
    },
    {
      id: "p12",
      categories: ["binary-search"],
      name: "Maximum Median",
      platform: "Codeforces 1201C",
      problemUrl: "https://codeforces.com/problemset/problem/1201/C",
      difficulty: "1400",
      difficultyTier: "Hard",
      tags: ["Binary Search on Answer", "Greedy"],
      hint: "Sort the array. In check(mid), calculate total operations required to raise all elements from index n/2 to n-1 to at least mid. Verify if sum <= k.",
      editorialUrl: "https://codeforces.com/blog/entry/68884"
    },
    {
      id: "p13",
      categories: ["binary-search"],
      name: "Factory Machines",
      platform: "CSES 1620",
      problemUrl: "https://cses.fi/problemset/task/1620",
      difficulty: "Classic",
      difficultyTier: "Hard",
      tags: ["Binary Search on Answer", "CSES"],
      hint: "Search on time t. In check(t), calculate sum(t / machine_time). If sum >= target products, search lower half.",
      editorialUrl: "https://usaco.guide/silver/binary-search"
    },

    // Additional Binary Search Practice Set (from Excel)
    {
      id: "p14",
      categories: ["binary-search"],
      name: "704. Binary Search",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/binary-search/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Classic binary search"]
    },
    {
      id: "p15",
      categories: ["binary-search"],
      name: "35. Search Insert Position",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/search-insert-position/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Lower bound"]
    },
    {
      id: "p16",
      categories: ["binary-search"],
      name: "278. First Bad Version",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/first-bad-version/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["First true in monotonic predicate"]
    },
    {
      id: "p17",
      categories: ["binary-search"],
      name: "69. Sqrt(x)",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/sqrtx/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Binary search on answer (integer)"]
    },
    {
      id: "p18",
      categories: ["binary-search"],
      name: "367. Valid Perfect Square",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/valid-perfect-square/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Binary search on answer (integer)"]
    },
    {
      id: "p19",
      categories: ["binary-search"],
      name: "744. Find Smallest Letter Greater Than Target",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/find-smallest-letter-greater-than-target/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Upper bound with wraparound"]
    },
    {
      id: "p20",
      categories: ["binary-search"],
      name: "706B - Interesting drink",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/706/B",
      difficulty: "~1100",
      difficultyTier: "Easy",
      tags: ["Sort + upper bound"]
    },
    {
      id: "p21",
      categories: ["binary-search"],
      name: "34. Find First and Last Position of Element in Sorted Array",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Lower and upper bound"]
    },
    {
      id: "p22",
      categories: ["binary-search"],
      name: "74. Search a 2D Matrix",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary search on flattened index"]
    },
    {
      id: "p23",
      categories: ["binary-search"],
      name: "474B - Worms",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/474/B",
      difficulty: "~1200",
      difficultyTier: "Easy",
      tags: ["Prefix sums + lower bound"]
    },
    {
      id: "p24",
      categories: ["binary-search"],
      name: "492B - Vanya and Lanterns",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/492/B",
      difficulty: "~1200",
      difficultyTier: "Easy",
      tags: ["Binary search on answer (min radius)"]
    },
    {
      id: "p25",
      categories: ["binary-search"],
      name: "153. Find Minimum in Rotated Sorted Array",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary search on a rotated array"]
    },
    {
      id: "p26",
      categories: ["binary-search"],
      name: "162. Find Peak Element",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/find-peak-element/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary search without full sortedness"]
    },
    {
      id: "p27",
      categories: ["binary-search"],
      name: "33. Search in Rotated Sorted Array",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary search on a rotated array"]
    },
    {
      id: "p28",
      categories: ["binary-search"],
      name: "165B - Burning Midnight Oil",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/165/B",
      difficulty: "~1500",
      difficultyTier: "Medium",
      tags: ["Binary search on answer"]
    },
    {
      id: "p29",
      categories: ["binary-search"],
      name: "875. Koko Eating Bananas",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary search on answer"]
    },
    {
      id: "p30",
      categories: ["binary-search"],
      name: "760B - Frodo and pillows",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/760/B",
      difficulty: "~1500",
      difficultyTier: "Medium",
      tags: ["Binary search on answer + arithmetic sums"]
    },
    {
      id: "p31",
      categories: ["binary-search"],
      name: "372A - Counting Kangaroos is Fun",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/372/A",
      difficulty: "~1600",
      difficultyTier: "Medium",
      tags: ["Binary search on answer + greedy matching"]
    },
    {
      id: "p32",
      categories: ["binary-search"],
      name: "1011. Capacity To Ship Packages Within D Days",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary search on answer + greedy check"]
    },
    {
      id: "p33",
      categories: ["binary-search"],
      name: "410. Split Array Largest Sum",
      platform: "LeetCode",
      problemUrl: "https://leetcode.com/problems/split-array-largest-sum/",
      difficulty: "Hard",
      difficultyTier: "Hard",
      tags: ["Binary search on answer + greedy partition"]
    },
    {
      id: "p34",
      categories: ["binary-search"],
      name: "1731D - Valiant's New Map",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/contest/1731/problem/D",
      difficulty: "~1900",
      difficultyTier: "Hard",
      tags: ["2D prefix sums + binary search on answer (square side)"]
    },
    {
      id: "p35",
      categories: ["binary-search"],
      name: "1852A - Ntarsis' Set",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/contest/1852/problem/A",
      difficulty: "~1700",
      difficultyTier: "Hard",
      tags: ["Binary search on answer"]
    },
    {
      id: "p36",
      categories: ["binary-search"],
      name: "1873E - Building an Aquarium",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/1873/E",
      difficulty: "~1100",
      difficultyTier: "Easy",
      tags: ["Binary search on answer + sum check"]
    },
    {
      id: "p37",
      categories: ["binary-search"],
      name: "1850E - Cardboard for Pictures",
      platform: "Codeforces",
      problemUrl: "https://codeforces.com/problemset/problem/1850/E",
      difficulty: "~1500",
      difficultyTier: "Medium",
      tags: ["Binary search on answer + sum of squares"]
    },
    {
      id: "p38",
      categories: ["binary-search"],
      name: "IC26TM - Team Formation Tactics (ICPC Online 2026 Postseason, G)",
      platform: "CodeChef",
      problemUrl: "https://www.codechef.com/ICPCOL26POST/problems/IC26TM",
      difficulty: "Hard",
      difficultyTier: "Hard",
      tags: []
    }
  ],

  additionalPractice: {
    cses: {
      title: "CSES — Binary Search Practice",
      platform: "CSES Problem Set",
      url: "https://cses.fi/problemset/",
      section: "Sorting and Searching",
      description:
        "Direct your practice to the Sorting and Searching section. While not every problem requires binary search, core problems like Factory Machines and Array Division test classic monotonic predicate formulation.",
      problems: [
        {
          name: "Factory Machines",
          taskId: "1620",
          url: "https://cses.fi/problemset/task/1620",
          technique: "Binary Search on Answer (sum(t / k_i) ≥ products)"
        },
        {
          name: "Array Division",
          taskId: "1085",
          url: "https://cses.fi/problemset/task/1085",
          technique: "Minimax Subarray Sum (Greedy k-segment partition)"
        }
      ],
      instruction: "Attempt these problems independently before reading editorials or viewing hints."
    },
    codeforces: {
      title: "Codeforces — Binary Search Tag Practice",
      platform: "Codeforces Problemset",
      url: "https://codeforces.com/problemset?tags=binary+search",
      description:
        "Filter problems by the 'binary search' tag on Codeforces and progress systematically through contest rating bands:",
      ratingBands: [
        {
          range: "800–1000",
          focus: "Basic search, sorted arrays, and simple boundary problems."
        },
        {
          range: "1100–1300",
          focus: "Lower/upper bounds, answer-space reasoning, and straightforward feasibility checks."
        },
        {
          range: "1400–1600",
          focus: "More involved predicates, greedy combinations, and binary search on the answer."
        },
        {
          range: "1700+",
          focus: "Advanced applications, continuous values, and less obvious monotonicity."
        }
      ],
      instruction:
        "Note: Codeforces problemset URLs do not support rating query parameters directly. Open the link above, enter your target minimum and maximum rating in the right-hand sidebar filter, and click Apply."
    },
    usaco: {
      title: "USACO Guide — Binary Search (Silver)",
      platform: "USACO Guide",
      url: "https://usaco.guide/silver/binary-search",
      description:
        "Use this structured module for rigorous invariant proofs, implementation templates, and curated contest problems with full editorials."
    },
    discussions: {
      title: "Participate in CPS WA Discussions",
      platform: "CPS Community",
      description:
        "Active discussion accelerates algorithmic intuition. Engage with fellow CPS members on our community channel:",
      guidelines: [
        "Share failed approaches and explain why they fail — analyzing failures reveals boundary misconceptions.",
        "Discuss edge cases, inclusive vs. exclusive interval definitions [low, high], and off-by-one errors.",
        "Ask for incremental hints before requesting complete solutions to preserve the problem-solving struggle.",
        "Explain your own accepted approaches to peer students to test and solidify your mastery.",
        "Learn from common implementation pitfalls (such as 32-bit integer overflow in mid computation or infinite loops)."
      ],
      note: "No direct WhatsApp link is embedded in the repository. Reach out to the CPS campus leads or check the club onboarding announcements for access."
    },
    upsolving: {
      title: "Upsolve Every Contest You Participate In",
      tagline: "Contest rating improves during the upsolving phase, not during the live contest.",
      workflow: [
        "Revisit every problem you could not solve or had a wrong submission on during the contest within 24–48 hours.",
        "Spend 30–45 minutes trying to solve it independently without looking at the editorial.",
        "Pinpoint the exact missing observation, monotonicity invariant, or technique that blocked you during the contest.",
        "Read editorial hints incrementally only after making a serious, focused attempt.",
        "Implement and submit an Accepted solution cleanly from scratch — never copy-paste editorial code.",
        "Log the key idea in your personal problem notebook and revisit a similar problem a week later."
      ],
      communityNote: "Discuss your upsolving attempts, alternate solutions, and doubts in the CPS WA Discussions."
    }
  },

  additionalResources: [
    "Practice CSES Sorting and Searching section: solve Factory Machines and Array Division independently.",
    "Solve Codeforces Binary Search ladder filtered by rating bands (800-1000, 1100-1300, 1400-1600, 1700+).",
    "Study USACO Guide Silver Binary Search module for structured explanations and implementation invariants.",
    "Participate actively in CPS WA Discussions: share failed attempts, discuss edge cases, and ask for hints.",
    "Upsolve every contest: revisit unsolved problems, implement Accepted solutions, and log key takeaways."
  ]
};

export { binarySearchTemplates, binarySearchTemplateCategories, algorithmicTemplates, templateCategories } from "./algorithmicTemplates.js";

export const TOPIC_SECTIONS = [
  {
    id: "binary-search",
    title: "Binary Search",
    shortTitle: "Binary Search",
    badge: "20 Problems + 1 Special",
    description: "Curated contest ladder covering basic bounds, monotonic predicate checks, and binary search on answer spaces."
  },
  {
    id: "code-templates",
    title: "Code Template",
    shortTitle: "Code Template",
    badge: "6 Templates",
    description: "Battle-tested, reusable C++ implementations for binary search patterns, lower/upper bounds, and answer-space predicates."
  }
];

export const binarySearchLadder = [
  {
    id: "p14",
    categories: ["binary-search"],
    name: "704. Binary Search",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
    difficultyTier: "Easy",
    tags: ["Classic binary search"]
  },
  {
    id: "p15",
    categories: ["binary-search"],
    name: "35. Search Insert Position",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/search-insert-position/",
    difficulty: "Easy",
    difficultyTier: "Easy",
    tags: ["Lower bound"]
  },
  {
    id: "p16",
    categories: ["binary-search"],
    name: "278. First Bad Version",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/first-bad-version/",
    difficulty: "Easy",
    difficultyTier: "Easy",
    tags: ["First true in monotonic predicate"]
  },
  {
    id: "p17",
    categories: ["binary-search"],
    name: "69. Sqrt(x)",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/sqrtx/",
    difficulty: "Easy",
    difficultyTier: "Easy",
    tags: ["Binary search on answer (integer)"]
  },
  {
    id: "p21",
    categories: ["binary-search"],
    name: "34. Find First and Last Position of Element in Sorted Array",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    difficulty: "Medium",
    difficultyTier: "Medium",
    tags: ["Lower and upper bound"]
  },
  {
    id: "p20",
    categories: ["binary-search"],
    name: "706B - Interesting drink",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/problemset/problem/706/B",
    difficulty: "~1100",
    difficultyTier: "Medium",
    tags: ["Sort + upper bound"]
  },
  {
    id: "p22",
    categories: ["binary-search"],
    name: "74. Search a 2D Matrix",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
    difficulty: "Medium",
    difficultyTier: "Medium",
    tags: ["Binary search on flattened index"]
  },
  {
    id: "p23",
    categories: ["binary-search"],
    name: "474B - Worms",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/problemset/problem/474/B",
    difficulty: "~1200",
    difficultyTier: "Medium",
    tags: ["Prefix sums + lower bound"]
  },
  {
    id: "p36",
    categories: ["binary-search"],
    name: "1873E - Building an Aquarium",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/problemset/problem/1873/E",
    difficulty: "~1100",
    difficultyTier: "Medium",
    tags: ["Binary search on answer + sum check"]
  },
  {
    id: "p24",
    categories: ["binary-search"],
    name: "492B - Vanya and Lanterns",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/problemset/problem/492/B",
    difficulty: "~1200",
    difficultyTier: "Medium",
    tags: ["Binary search on answer (min radius)"]
  },
  {
    id: "p25",
    categories: ["binary-search"],
    name: "153. Find Minimum in Rotated Sorted Array",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    difficulty: "Medium",
    difficultyTier: "Medium",
    tags: ["Binary search on a rotated array"]
  },
  {
    id: "p26",
    categories: ["binary-search"],
    name: "162. Find Peak Element",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/find-peak-element/",
    difficulty: "Medium",
    difficultyTier: "Medium",
    tags: ["Binary search without full sortedness"]
  },
  {
    id: "p27",
    categories: ["binary-search"],
    name: "33. Search in Rotated Sorted Array",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    difficultyTier: "Medium",
    tags: ["Binary search on a rotated array"]
  },
  {
    id: "p37",
    categories: ["binary-search"],
    name: "1850E - Cardboard for Pictures",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/problemset/problem/1850/E",
    difficulty: "~1500",
    difficultyTier: "Medium",
    tags: ["Binary search on answer + sum of squares"]
  },
  {
    id: "p28",
    categories: ["binary-search"],
    name: "165B - Burning Midnight Oil",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/problemset/problem/165/B",
    difficulty: "~1500",
    difficultyTier: "Medium",
    tags: ["Binary search on answer"]
  },
  {
    id: "p29",
    categories: ["binary-search"],
    name: "875. Koko Eating Bananas",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/koko-eating-bananas/",
    difficulty: "Medium",
    difficultyTier: "Medium",
    tags: ["Binary search on answer"]
  },
  {
    id: "p30",
    categories: ["binary-search"],
    name: "760B - Frodo and pillows",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/problemset/problem/760/B",
    difficulty: "~1500",
    difficultyTier: "Medium",
    tags: ["Binary search on answer + arithmetic sums"]
  },
  {
    id: "p32",
    categories: ["binary-search"],
    name: "1011. Capacity To Ship Packages Within D Days",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    difficulty: "Medium",
    difficultyTier: "Medium",
    tags: ["Binary search on answer + greedy check"]
  },
  {
    id: "p33",
    categories: ["binary-search"],
    name: "410. Split Array Largest Sum",
    platform: "LeetCode",
    problemUrl: "https://leetcode.com/problems/split-array-largest-sum/",
    difficulty: "Hard",
    difficultyTier: "Hard",
    tags: ["Binary search on answer + greedy partition"]
  },
  {
    id: "p34",
    categories: ["binary-search"],
    name: "1731D - Valiant's New Map",
    platform: "Codeforces",
    problemUrl: "https://codeforces.com/contest/1731/problem/D",
    difficulty: "~1900",
    difficultyTier: "Hard",
    tags: ["2D prefix sums + binary search on answer (square side)"]
  }
];

export const specialProblem = {
  id: "p38",
  categories: ["binary-search"],
  name: "IC26TM - Team Formation Tactics (ICPC Online 2026 Postseason, Problem G)",
  platform: "CodeChef",
  problemUrl: "https://www.codechef.com/ICPCOL26POST/problems/IC26TM",
  difficulty: "Special",
  difficultyTier: "Special",
  tags: ["ICPC Online 2026", "Binary search on team size"]
};
