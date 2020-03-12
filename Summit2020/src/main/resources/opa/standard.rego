package http.authz

default allow = false

allow {
  input.method == "GET"
  input.path = ["api","v1", "inspect", "username"]
  is_authenticated
  authorities := input.auth.authorities
  authorities[_].authority == "ROLE_USER"
}

allow {
  input.method == "GET"
  input.path = ["api","v1", "inspect", "roles"]
  is_authenticated

  authorities := input.auth.authorities
  authorities[_].authority == "ROLE_USER"
}

allow {
  input.method == "GET"
  input.path = ["api","v1", "inspect", "authentication"]
  is_authenticated
  authorities := input.auth.authorities
  authorities[_].authority == "ROLE_USER"
}

allow {
  input.method == "GET"
  input.path = ["api","v1", "special-sauce"]
  is_authenticated

  authorities := input.auth.authorities
  authorities[_].authority == "ROLE_SUPER-USER"
}

is_authenticated { input.auth.authenticated == true }
