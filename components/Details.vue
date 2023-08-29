<template>
  <div>
    <div class="map" v-if="!manualAddress">
      <p>Place the marker at the location of the issue you wish to report</p>
      <Map />
      <p>{{ this.$store.state.report.address.formatted }}</p>
    </div>
    <div class="manual-add container">
      <label for="manualAdd">I want to enter the address manually</label>
      <input
        type="checkbox"
        name="manualAdd"
        id="manualAdd"
        v-model="manualAddress"
      />
    </div>
    <form
      class="form-group was-validated"
      id="main-form"
      @submit.prevent="submitReport"
    >
      <div v-if="manualAddress">
        <h3>Enter the address</h3>
        <label for="firstAdd">1st line of Address</label>
        <input
          type="text"
          name="firstAdd"
          id=""
          class="form-control"
          required
          v-model="manualAdd.address1"
        />
        <label for="secondAdd">2nd line of Address</label>
        <input
          type="text"
          name="secondAdd"
          id=""
          class="form-control"
          v-model="manualAdd.address2"
        />
        <label for="postcode">Postcode</label>
        <input
          type="text"
          name="postcode"
          id=""
          class="form-control"
          required
          v-model="manualAdd.postcode"
        />
        <label for="city">Town/City</label>
        <input
          type="text"
          name="city"
          id=""
          class="form-control"
          required
          v-model="manualAdd.city"
        />
      </div>
      <h3>Problem Details</h3>

      <label for="loc-details"
        >Can you give any further information? Such as a house number, business
        name or description of the problem?</label
      >
      <textarea
        name="loc-details"
        id=""
        cols="40"
        rows="5"
        v-model="report.details"
        class="form-control"
        required
        minlength="10"
      ></textarea>

      <h3>Photo</h3>
      <label for="image-file"
        >Are you able to provide a photo of the issue?</label
      >
      <input
        id="image-file"
        type="file"
        @change="onFilePicked"
        class="form-control"
        required
      />
      <img v-if="preview" :src="preview" id="preview" />
      <div v-if="!report.anon">
        <h3>Personal Details</h3>
        <label for="title">Title</label>
        <select
          class="form-control form-control-sm"
          id="title"
          required
          v-model="report.title"
        >
          <option>Mr</option>
          <option>Ms</option>
          <option>Mrs</option>
          <option>Councillor</option>
          <option>Doctor</option>
          <option>Other</option>
          <option>Prefer not to say</option>
        </select>
        <label for="first-name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first-name"
          required
          v-model="report.firstName"
        />
        <label for="surname">Surname</label>
        <input
          type="text"
          class="form-control"
          id="surname"
          required
          v-model="report.lastName"
        />
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@email.com"
          required
          v-model="report.email"
        />
        <label for="phone">Phone Number</label>
        <input
          type="tel"
          class="form-control"
          id="phone"
          v-model="report.phoneNumber"
        />

        <div class="form-check" id="priv">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="privacy"
            required
          />
          <label class="form-check-label" for="privacy">
            I have read and accepted the
            <a href="/privacy" target="_blank"> privacy policy </a>
          </label>
        </div>
      </div>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="anon"
          v-model="report.anon"
        />
        <label class="form-check-label" for="anon">
          I want to report this anonymously
        </label>
      </div>

      <button class="btn btn-primary btn-lg" id="submit" type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    category: String,
  },

  data() {
    return {
      manualAddress: false,
      report: {
        address: this.$store.state.report.address.formatted,
        category: this.category,
        details: "",
        anon: false,
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        photo: null,
      },
      manualAdd: {
        address1: "",
        address2: "",
        postcode: "",
        city: "",
        formatted: "",
      },
      preview: null,
    };
  },

  methods: {
    onFilePicked(event) {
      console.log(event);
      this.report.photo = event.target.files[0];
      this.preview = URL.createObjectURL(this.report.photo);
    },
    async submitReport() {
      const form = document.getElementById("main-form");
      const formData = new FormData();

      if (this.report.photo !== null) {
        formData.append("photo", this.report.photo, this.report.photo.fileName);
      }

      formData.append("category", this.report.category);
      formData.append("details", this.report.details);

      formData.append("lat", this.$store.state.report.address.lat);
      formData.append("lon", this.$store.state.report.address.lon);

      if (!form.checkValidity || form.checkValidity()) {
        if (this.manualAddress) {
          this.manualAdd.formatted =
            this.manualAdd.address1 +
            ", " +
            this.manualAdd.city +
            ", " +
            this.manualAdd.postcode;
          formData.append("address", this.manualAdd.formatted);
          this.$store.commit("setAddress", this.manualAdd);
          this.$store.commit("setDetails", this.report);
          this.$axios.$post("/reports/all/", formData);
          this.$router.push("/success");
        } else formData.append("address", this.report.address);
        this.$axios.$post("/reports/all/", formData);
        this.$store.commit("setDetails", this.report);
        this.$router.push("/success");
      }
    },
  },

  computed: {
    manAdd() {
      if ((this.manualAddress = true)) {
        return (
          this.manualAdd.address1 +
          ", " +
          this.manualAdd.city +
          ", " +
          this.manualAdd.postcode
        );
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
.map {
  padding-top: 1em;
  text-align: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.manual-add {
  text-align: center;
  font-style: italic;
}
#submit {
  margin-top: 1em;
}

#main-form label {
  padding-top: 0.4em;
}

#main-form h3 {
  padding-top: 1em;
}

#anon,
#priv {
  padding-bottom: 2em;
  padding-top: 1.2em;
}

#title {
  max-width: 14em;
}

#image-file {
  padding-bottom: 2.2em;
}

@media screen and (min-width: 600px) {
  #preview {
    max-width: 25%;
  }
  .form-group {
    max-width: 80vw;
  }
}
</style>
