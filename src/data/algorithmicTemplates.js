export const binarySearchTemplateCategories = [
  "All",
  "Answer Space Optimization",
  "Boundary Search",
  "Predicate Acceleration",
  "Partitioned / Inflected Arrays",
  "Continuous Optimization"
];

export const binarySearchTemplates = [
  {
    id: "bs-monotonic-answer",
    category: "Answer Space Optimization",
    title: "Binary Search on Monotonic Answer Space (Minimax / check(mid))",
    summary: "Transform an optimization problem into a monotonic feasibility decision check.",
    whenToUse:
      "Use when asked to minimize a maximum or maximize a minimum value over a search space (e.g. minimum capacity to ship packages, minimum speed to eat bananas, aggressive cows). The feasibility predicate check(mid) must be monotonic (e.g. FFFFTTTT).",
    timeComplexity: "O(Cost(check) · log(high - low))",
    spaceComplexity: "O(1) auxiliary",
    codeSnippet: `// Minimizing X such that check(X) is true (Predicate: F F F ... T T T)
// Example: Capacity to ship packages in D days, Koko eating bananas
long long low = min_possible_answer;
long long high = max_possible_answer;
long long ans = high;

while (low <= high) {
    long long mid = low + (high - low) / 2; // Prevents 32-bit overflow

    if (check(mid)) {
        ans = mid;         // Feasible: record answer and search for a smaller valid value
        high = mid - 1;
    } else {
        low = mid + 1;     // Infeasible: answer must be strictly larger
    }
}
return ans;`
  },
  {
    id: "bs-lower-bound",
    category: "Boundary Search",
    title: "Lower Bound on Sorted Range (First Index with A[i] ≥ target)",
    summary: "Finds the first position whose element is not less than a given target.",
    whenToUse:
      "Use to locate the lower boundary of a value in a sorted array or dynamic vector. Equivalent to std::lower_bound, returning n if no element satisfies the condition.",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    codeSnippet: `// Returns the first index i such that a[i] >= target, or a.size() if none exists
int lower_bound_custom(const vector<int>& a, int target) {
    int low = 0, high = (int)a.size() - 1;
    int ans = a.size(); // Default if all elements are strictly less than target

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] >= target) {
            ans = mid;     // Candidate found; seek earlier occurrence on the left
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
  },
  {
    id: "bs-upper-bound",
    category: "Boundary Search",
    title: "Upper Bound & Range Frequency (First Index with A[i] > target)",
    summary: "Finds the first position strictly greater than target. upper_bound - lower_bound counts occurrences in O(log N).",
    whenToUse:
      "Use to find where elements strictly greater than target begin. Combining lower_bound and upper_bound yields the exact frequency and index range [L, R) of any element in O(log N).",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    codeSnippet: `// Returns the first index i such that a[i] > target, or a.size() if none exists
int upper_bound_custom(const vector<int>& a, int target) {
    int low = 0, high = (int)a.size() - 1;
    int ans = a.size();

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] > target) {
            ans = mid;     // Element strictly greater; seek earlier boundary
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

// Frequency of 'target' in sorted array 'a' in O(log N):
// int count = upper_bound_custom(a, target) - lower_bound_custom(a, target);`
  },
  {
    id: "bs-prefix-sums",
    category: "Predicate Acceleration",
    title: "Binary Search with Prefix Sums Feasibility Check",
    summary: "Accelerating check(mid) to O(1) range queries using precomputed prefix sums.",
    whenToUse:
      "Use when the feasibility check requires querying contiguous subarray sums or testing if any subsegment of length L has sum ≥ mid or average ≥ mid (e.g. Maximum Average Subarray, Worms).",
    timeComplexity: "Preprocessing: O(N), Query: O(1), Overall: O(N · log(range))",
    spaceComplexity: "O(N)",
    codeSnippet: `// 1-indexed Prefix Sum Preprocessing
vector<long long> pref(n + 1, 0);
for (int i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + a[i];
}

// Constant-time range query [l, r] (0-indexed inclusive)
auto rangeSum = [&](int l, int r) -> long long {
    return pref[r + 1] - pref[l];
};

// Feasibility predicate using prefix sums:
bool check(long long target_sum) {
    // Example: verify if any subarray of length k has sum >= target_sum
    for (int i = 0; i + k - 1 < n; i++) {
        if (rangeSum(i, i + k - 1) >= target_sum) {
            return true;
        }
    }
    return false;
}`
  },
  {
    id: "bs-rotated-array",
    category: "Partitioned / Inflected Arrays",
    title: "Binary Search on Rotated Sorted Array",
    summary: "Locating a target value in a circularly rotated array without full sortedness.",
    whenToUse:
      "Use when a sorted array has been shifted around an unknown pivot point. At least one half [low, mid] or [mid, high] is always strictly sorted on each iteration.",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    codeSnippet: `int searchRotated(const vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        // Check if the left half [low, mid] is sorted
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1; // Target lies inside sorted left half
            } else {
                low = mid + 1;  // Target lies in right half
            }
        } else {
            // Otherwise, the right half [mid, high] is guaranteed to be sorted
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;  // Target lies inside sorted right half
            } else {
                high = mid - 1; // Target lies in left half
            }
        }
    }
    return -1; // Target not found
}`
  },
  {
    id: "bs-continuous-real",
    category: "Continuous Optimization",
    title: "Continuous / Floating-Point Binary Search (Fixed Iterations)",
    summary: "High-precision binary search on real numbers avoiding precision and termination issues.",
    whenToUse:
      "Use for geometric or continuous physics problems (e.g. Vanya and Lanterns radius, geometric distance, finding roots of continuous monotonic functions). Loop exactly 60-100 times to guarantee precision without epsilon rounding bugs.",
    timeComplexity: "O(K · Cost(check)) where K = 60–100",
    spaceComplexity: "O(1)",
    codeSnippet: `// Minimizing real value X with 10^-9 precision (e.g., minimum radius D)
double low = 0.0, high = 1e9;

// Fixed 100 iterations achieves precision of (1e9) / 2^100 ≈ 7.8e-22, eliminating infinite loops
for (int iter = 0; iter < 100; iter++) {
    double mid = low + (high - low) / 2.0;

    if (checkReal(mid)) {
        high = mid; // Search smaller valid real number
    } else {
        low = mid;  // Search larger real number
    }
}
double optimal_answer = low;`
  }
];

// Preserved for backward compatibility
export const templateCategories = binarySearchTemplateCategories;
export const algorithmicTemplates = binarySearchTemplates;
